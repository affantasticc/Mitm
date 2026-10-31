import { Mandi, Commodity, MandiAllocationScenario } from '../types';

export interface OptimizationInputs {
  commodity: Commodity;
  quantityQtl: number;
  farmerLat: number;
  farmerLng: number;
  mandis: Mandi[];
  currentModalPrices: Record<string, number>; // mandiId -> price
  forecastedPrices7d: Record<string, number>; // mandiId -> forecasted price
  maxDistanceKm?: number;
}

// Calculate Haversine distance with Indian road circuity factor (1.25)
export function calculateRoadDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const crowFlies = R * c;
  return Math.round(crowFlies * 1.25); // 1.25 road winding factor
}

// Spoilage / quality loss rate per 100 km transit
function getTransitSpoilageFactor(commodityId: string, distanceKm: number): number {
  switch (commodityId) {
    case 'tomato':
      return (distanceKm / 100) * 0.025; // 2.5% per 100km
    case 'chilli':
      return (distanceKm / 100) * 0.015;
    case 'onion':
    case 'potato':
      return (distanceKm / 100) * 0.005;
    case 'paddy':
    case 'ragi':
    case 'maize':
      return 0.001; // minimal
    default:
      return 0.01;
  }
}

export function solveMultiMandiAllocation(inputs: OptimizationInputs): MandiAllocationScenario[] {
  const {
    commodity,
    quantityQtl,
    farmerLat,
    farmerLng,
    mandis,
    currentModalPrices,
    forecastedPrices7d,
    maxDistanceKm = 160
  } = inputs;

  // Filter mandis within reachable distance and that trade this commodity
  const candidates = mandis
    .map(m => {
      const dist = calculateRoadDistanceKm(farmerLat, farmerLng, m.latitude, m.longitude);
      const currPrice = currentModalPrices[m.id] || 2000;
      const fcastPrice = forecastedPrices7d[m.id] || currPrice * 1.05;
      const availableCapacityTonnes = Math.max(0, m.dailyCapacityTonnes - m.currentArrivalsTonnes);
      const availableCapacityQtl = availableCapacityTonnes * 10;
      return {
        ...m,
        distanceKm: dist,
        currentPrice: currPrice,
        forecastPrice: fcastPrice,
        availableCapacityQtl
      };
    })
    .filter(m => m.distanceKm <= maxDistanceKm && m.supportedCommodities.some(c => c.toLowerCase() === commodity.name.toLowerCase()));

  // Sort by distance to find closest
  const sortedByDistance = [...candidates].sort((a, b) => a.distanceKm - b.distanceKm);
  const closestMandi = sortedByDistance[0] || candidates[0];

  // Helper to compute realization for a specific mandi allocation
  function computeMandiRealization(mandi: typeof candidates[0], allocatedQtl: number, pricePerQtl: number, holdingDays = 0) {
    const grossRevenue = allocatedQtl * pricePerQtl;
    // Freight: base 400 INR + 1.6 INR per quintal per km (typical tempo/truck tariff)
    const transportCost = Math.round(350 + allocatedQtl * mandi.distanceKm * 1.55);
    // Handling: hamali & weighing
    const handlingCost = Math.round(allocatedQtl * mandi.unloadingChargePerQtl);
    // APMC Market cess
    const marketFees = Math.round(grossRevenue * (mandi.marketFeePercent / 100));
    // Spoilage & shrinkage
    const transitSpoilagePercent = getTransitSpoilageFactor(commodity.id, mandi.distanceKm) + (holdingDays * 0.015);
    const spoilageLoss = Math.round(grossRevenue * transitSpoilagePercent);

    const totalDeductions = transportCost + handlingCost + marketFees + spoilageLoss;
    const netRealization = Math.round(grossRevenue - totalDeductions);
    const netPricePerKg = Math.round((netRealization / (allocatedQtl * 100)) * 100) / 100;

    return {
      mandiId: mandi.id,
      mandiName: mandi.name,
      distanceKm: mandi.distanceKm,
      quantityQtl: allocatedQtl,
      expectedModalPrice: pricePerQtl,
      grossRevenue,
      transportCost,
      handlingCost,
      marketFees,
      spoilageLoss,
      netRealization,
      netPricePerKg
    };
  }

  // --- SCENARIO A: 100% immediate to closest mandi ---
  const allocA = [computeMandiRealization(closestMandi, quantityQtl, closestMandi.currentPrice, 0)];
  const totalGrossA = allocA.reduce((sum, a) => sum + a.grossRevenue, 0);
  const totalExpA = allocA.reduce((sum, a) => sum + (a.transportCost + a.handlingCost + a.marketFees + a.spoilageLoss), 0);
  const netA = totalGrossA - totalExpA;

  // --- SCENARIO B: Hold for 4 days for price peak ---
  const allocB = [computeMandiRealization(closestMandi, quantityQtl, closestMandi.forecastPrice, 4)];
  const totalGrossB = allocB.reduce((sum, a) => sum + a.grossRevenue, 0);
  const totalExpB = allocB.reduce((sum, a) => sum + (a.transportCost + a.handlingCost + a.marketFees + a.spoilageLoss), 0);
  const netB = totalGrossB - totalExpB;

  // --- SCENARIO C: Optimal Multi-Mandi Allocation ---
  // Rank mandis by expected net realization per quintal today
  const candidateScores = candidates.map(m => {
    const singleQtlEval = computeMandiRealization(m, 1, m.currentPrice, 0);
    return {
      mandi: m,
      netPerQtl: singleQtlEval.netRealization
    };
  }).sort((a, b) => b.netPerQtl - a.netPerQtl);

  const bestMandi = candidateScores[0]?.mandi || closestMandi;
  const secondBestMandi = candidateScores[1]?.mandi || closestMandi;

  let allocC;
  if (bestMandi.id !== secondBestMandi.id && quantityQtl >= 20) {
    // Split 65% to best mandi (higher price), 35% to second best (risk hedge & capacity ease)
    const qtl1 = Math.round(quantityQtl * 0.65);
    const qtl2 = quantityQtl - qtl1;
    allocC = [
      computeMandiRealization(bestMandi, qtl1, bestMandi.currentPrice, 0),
      computeMandiRealization(secondBestMandi, qtl2, secondBestMandi.currentPrice, 0)
    ];
  } else {
    allocC = [computeMandiRealization(bestMandi, quantityQtl, bestMandi.currentPrice, 0)];
  }
  const totalGrossC = allocC.reduce((sum, a) => sum + a.grossRevenue, 0);
  const totalExpC = allocC.reduce((sum, a) => sum + (a.transportCost + a.handlingCost + a.marketFees + a.spoilageLoss), 0);
  const netC = totalGrossC - totalExpC;

  // --- SCENARIO D: Cold Storage 10 Days then Sell ---
  const coldStorageMandi = candidates.find(m => m.coldStorageAvailable) || bestMandi;
  // Assume cold storage fee: 45 INR per quintal, quality preserved with 2% shrinkage
  const futurePrice = coldStorageMandi.forecastPrice * 1.08; // expected seasonal gain
  const allocDRecord = computeMandiRealization(coldStorageMandi, quantityQtl, futurePrice, 0);
  const coldStorageFee = quantityQtl * 50;
  allocDRecord.handlingCost += coldStorageFee;
  allocDRecord.netRealization -= coldStorageFee;
  allocDRecord.netPricePerKg = Math.round((allocDRecord.netRealization / (quantityQtl * 100)) * 100) / 100;
  const allocD = [allocDRecord];
  const totalGrossD = allocD.reduce((sum, a) => sum + a.grossRevenue, 0);
  const totalExpD = allocD.reduce((sum, a) => sum + (a.transportCost + a.handlingCost + a.marketFees + a.spoilageLoss), 0);
  const netD = totalGrossD - totalExpD;

  const scenarios: MandiAllocationScenario[] = [
    {
      scenarioId: 'scenario-c',
      title: 'Scenario C: Dual-Mandi Optimal Allocation',
      description: `Optimized division between ${bestMandi.name} and ${secondBestMandi.name} to maximize auction realization without oversupplying a single yard.`,
      allocations: allocC,
      totalGrossRevenue: totalGrossC,
      totalExpenses: totalExpC,
      totalNetRealization: netC,
      averageNetRealizationPerQtl: Math.round(netC / quantityQtl),
      recommendationRank: 1,
      riskAssessment: 'Balanced',
      aiExplanation: {
        en: `By sending ${allocC[0]?.quantityQtl} qtl to ${bestMandi.name} (higher premium) and ${allocC[1]?.quantityQtl || 0} qtl to ${secondBestMandi.name}, you avoid auction discounts from local oversupply. Net farmer realization increases by ₹${Math.max(0, netC - netA).toLocaleString('en-IN')} over selling 100% locally.`,
        kn: `${bestMandi.name} ಗೆ ${allocC[0]?.quantityQtl} ಕ್ವಿಂಟಾಲ್ ಮತ್ತು ${secondBestMandi.name} ಗೆ ${allocC[1]?.quantityQtl || 0} ಕ್ವಿಂಟಾಲ್ ಕಳುಹಿಸುವುದರಿಂದ ಏಕ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಹರಾಜು ಬೆಲೆ ಕುಸಿತ ತಪ್ಪಿಸಬಹುದು. ಸ್ಥಳೀಯ ಮಂಡಿಗಿಂತ ಒಟ್ಟು ₹${Math.max(0, netC - netA).toLocaleString('en-IN')} ಹೆಚ್ಚುವರಿ ನಿವ್ವಳ ಲಾಭ ದೊರೆಯಲಿದೆ.`,
        hi: `${bestMandi.name} को ${allocC[0]?.quantityQtl} क्विंटल और ${secondBestMandi.name} को ${allocC[1]?.quantityQtl || 0} क्विंटल भेजने से स्थानीय मंडी की तुलना में ₹${Math.max(0, netC - netA).toLocaleString('en-IN')} का अधिक शुद्ध मुनाफा प्राप्त होगा।`
      }
    },
    {
      scenarioId: 'scenario-a',
      title: 'Scenario A: Sell 100% Immediately to Closest Mandi',
      description: `Direct delivery to nearest market (${closestMandi.name}) with minimal transit time and lowest freight expenses.`,
      allocations: allocA,
      totalGrossRevenue: totalGrossA,
      totalExpenses: totalExpA,
      totalNetRealization: netA,
      averageNetRealizationPerQtl: Math.round(netA / quantityQtl),
      recommendationRank: 2,
      riskAssessment: 'Low Risk',
      aiExplanation: {
        en: `Lowest transport cost (₹${allocA[0]?.transportCost}) and zero holding risk. Suitable if you require immediate liquidity today or produce has reached full ripeness.`,
        kn: `ಅತೀ ಕಡಿಮೆ ಸಾರಿಗೆ ವೆಚ್ಚ (₹${allocA[0]?.transportCost}) ಮತ್ತು ಸರಕು ಕೆಡುವ ಅಪಾಯವಿಲ್ಲ. ಇಂದೇ ತುರ್ತು ಹಣದ ಅಗತ್ಯವಿದ್ದರೆ ಇದು ಸೂಕ್ತ ಆಯ್ಕೆ.`,
        hi: `न्यूनतम परिवहन लागत (₹${allocA[0]?.transportCost}) और कोई भंडारण जोखिम नहीं। यदि तुरंत नकदी की आवश्यकता हो तो यह सुरक्षित है।`
      }
    },
    {
      scenarioId: 'scenario-b',
      title: 'Scenario B: Hold 4 Days for Forecasted Price Peak',
      description: `Wait for the predicted upward price momentum before dispatching to ${closestMandi.name}.`,
      allocations: allocB,
      totalGrossRevenue: totalGrossB,
      totalExpenses: totalExpB,
      totalNetRealization: netB,
      averageNetRealizationPerQtl: Math.round(netB / quantityQtl),
      recommendationRank: 3,
      riskAssessment: 'High Uncertainty',
      aiExplanation: {
        en: `Predicted price increases to ₹${closestMandi.forecastPrice}/qtl, but weight shrinkage and spoilage (${commodity.name} loses ~4% firmness) offset part of the gain. Recommended only if on-farm shading/crates are available.`,
        kn: `ಮುನ್ಸೂಚನೆಯಂತೆ ಬೆಲೆ ₹${closestMandi.forecastPrice} ಗೆ ಏರುವ ಸಾಧ್ಯತೆಯಿದೆ, ಆದರೆ 4 ದಿನ ಇಡುವುದರಿಂದ ತೂಕ ಕುಸಿತ ಮತ್ತು ಹಾಳಾಗುವಿಕೆ ಇರುತ್ತದೆ. ಉತ್ತಮ ಶೀತಲ ನೆರಳು ಇದ್ದರೆ ಮಾತ್ರ ಕಾಯಿರಿ.`,
        hi: `पूर्वानुमान के अनुसार भाव ₹${closestMandi.forecastPrice} तक बढ़ सकता है, परंतु 4 दिन रखने से वजन में कमी का जोखिम रहेगा।`
      }
    },
    {
      scenarioId: 'scenario-d',
      title: 'Scenario D: Cold Storage 10 Days then Sell',
      description: `Store in ${coldStorageMandi.name} cold store to capture post-festival price recovery.`,
      allocations: allocD,
      totalGrossRevenue: totalGrossD,
      totalExpenses: totalExpD,
      totalNetRealization: netD,
      averageNetRealizationPerQtl: Math.round(netD / quantityQtl),
      recommendationRank: 4,
      riskAssessment: 'Balanced',
      aiExplanation: {
        en: `Cold storage adds ₹${coldStorageFee} in rental fees, but locks in shelf-life. Feasible for semi-perishables (Onion, Potato) or Grade A Export Tomatoes.`,
        kn: `ಶೀತಲ ಗೋದಾಮಿಗೆ ₹${coldStorageFee} ಬಾಡಿಗೆ ವೆಚ್ಚವಾಗಲಿದೆ. ಈರುಳ್ಳಿ ಅಥವಾ ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಟೊಮ್ಯಾಟೊಗೆ ಇದು ಸೂಕ್ತ.`,
        hi: `कोल्ड स्टोरेज में ₹${coldStorageFee} का किराया लगेगा, लेकिन फसल सुरक्षित रहेगी। प्याज या आलू के लिए यह श्रेष्ठ रणनीति है।`
      }
    }
  ];

  // Re-rank based on net realization
  return scenarios.sort((a, b) => b.totalNetRealization - a.totalNetRealization);
}
