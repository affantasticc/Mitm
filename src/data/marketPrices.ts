import { MarketObservation, AnomalyAlert, ColdStorageUnit, SharedTransportTrip, ProduceListing, GovernmentScheme } from '../types';

export const CURRENT_MARKET_OBSERVATIONS: MarketObservation[] = [
  // Tomato
  {
    id: 'obs-tom-kolar-today',
    mandiId: 'mandi-kolar',
    mandiName: 'Kolar APMC Market Yard',
    district: 'Kolar',
    commodityId: 'tomato',
    commodityName: 'Tomato',
    variety: 'Hybrid (Shivam)',
    minPrice: 1800,
    maxPrice: 2600,
    modalPrice: 2350,
    arrivals: 7400,
    date: '2026-10-30',
    source: 'AGMARKNET',
    isLive: true,
    unit: 'Quintal'
  },
  {
    id: 'obs-tom-yeshwantpur-today',
    mandiId: 'mandi-yeshwantpur',
    mandiName: 'Bengaluru Yeshwantpur APMC',
    district: 'Bengaluru Urban',
    commodityId: 'tomato',
    commodityName: 'Tomato',
    variety: 'Hybrid (Shivam)',
    minPrice: 2100,
    maxPrice: 2850,
    modalPrice: 2550,
    arrivals: 6800,
    date: '2026-10-30',
    source: 'AGMARKNET',
    isLive: true,
    unit: 'Quintal'
  },
  {
    id: 'obs-tom-mandya-today',
    mandiId: 'mandi-mandya',
    mandiName: 'Mandya APMC Market Yard',
    district: 'Mandya',
    commodityId: 'tomato',
    commodityName: 'Tomato',
    variety: 'Local Country (Nati)',
    minPrice: 1650,
    maxPrice: 2150,
    modalPrice: 1950,
    arrivals: 1800,
    date: '2026-10-30',
    source: 'AGMARKNET',
    isLive: true,
    unit: 'Quintal'
  },
  {
    id: 'obs-tom-mysuru-today',
    mandiId: 'mandi-mysuru',
    mandiName: 'Mysuru Bandipalya APMC',
    district: 'Mysuru',
    commodityId: 'tomato',
    commodityName: 'Tomato',
    variety: 'Hybrid (Shivam)',
    minPrice: 1850,
    maxPrice: 2400,
    modalPrice: 2200,
    arrivals: 2600,
    date: '2026-10-30',
    source: 'AGMARKNET',
    isLive: true,
    unit: 'Quintal'
  },
  {
    id: 'obs-tom-chikkaballapur-today',
    mandiId: 'mandi-chikkaballapur',
    mandiName: 'Chikkaballapur APMC Yard',
    district: 'Chikkaballapur',
    commodityId: 'tomato',
    commodityName: 'Tomato',
    variety: 'US-440',
    minPrice: 1900,
    maxPrice: 2500,
    modalPrice: 2300,
    arrivals: 4100,
    date: '2026-10-30',
    source: 'AGMARKNET',
    isLive: true,
    unit: 'Quintal'
  },

  // Onion
  {
    id: 'obs-on-yeshwantpur-today',
    mandiId: 'mandi-yeshwantpur',
    mandiName: 'Bengaluru Yeshwantpur APMC',
    district: 'Bengaluru Urban',
    commodityId: 'onion',
    commodityName: 'Onion',
    variety: 'Nashik Red',
    minPrice: 2400,
    maxPrice: 3200,
    modalPrice: 2900,
    arrivals: 9500,
    date: '2026-10-30',
    source: 'AGMARKNET',
    isLive: true,
    unit: 'Quintal'
  },
  {
    id: 'obs-on-hubballi-today',
    mandiId: 'mandi-hubballi',
    mandiName: 'Hubballi Amargol APMC',
    district: 'Dharwad',
    commodityId: 'onion',
    commodityName: 'Onion',
    variety: 'Bellary Red',
    minPrice: 2100,
    maxPrice: 2750,
    modalPrice: 2480,
    arrivals: 8200,
    date: '2026-10-30',
    source: 'AGMARKNET',
    isLive: true,
    unit: 'Quintal'
  },
  {
    id: 'obs-on-mysuru-today',
    mandiId: 'mandi-mysuru',
    mandiName: 'Mysuru Bandipalya APMC',
    district: 'Mysuru',
    commodityId: 'onion',
    commodityName: 'Onion',
    variety: 'Bellary Red',
    minPrice: 2300,
    maxPrice: 2950,
    modalPrice: 2650,
    arrivals: 2100,
    date: '2026-10-30',
    source: 'AGMARKNET',
    isLive: true,
    unit: 'Quintal'
  },

  // Potato
  {
    id: 'obs-pot-hassan-today',
    mandiId: 'mandi-hassan',
    mandiName: 'Hassan APMC Yard',
    district: 'Hassan',
    commodityId: 'potato',
    commodityName: 'Potato',
    variety: 'Kufri Jyoti',
    minPrice: 1450,
    maxPrice: 1950,
    modalPrice: 1750,
    arrivals: 5400,
    date: '2026-10-30',
    source: 'AGMARKNET',
    isLive: true,
    unit: 'Quintal'
  },
  {
    id: 'obs-pot-kolar-today',
    mandiId: 'mandi-kolar',
    mandiName: 'Kolar APMC Market Yard',
    district: 'Kolar',
    commodityId: 'potato',
    commodityName: 'Potato',
    variety: 'Kufri Jyoti',
    minPrice: 1550,
    maxPrice: 2100,
    modalPrice: 1880,
    arrivals: 3100,
    date: '2026-10-30',
    source: 'AGMARKNET',
    isLive: true,
    unit: 'Quintal'
  },
  {
    id: 'obs-pot-yeshwantpur-today',
    mandiId: 'mandi-yeshwantpur',
    mandiName: 'Bengaluru Yeshwantpur APMC',
    district: 'Bengaluru Urban',
    commodityId: 'potato',
    commodityName: 'Potato',
    variety: 'Kufri Chandramukhi',
    minPrice: 1700,
    maxPrice: 2300,
    modalPrice: 2050,
    arrivals: 6200,
    date: '2026-10-30',
    source: 'AGMARKNET',
    isLive: true,
    unit: 'Quintal'
  },

  // Paddy
  {
    id: 'obs-pad-mandya-today',
    mandiId: 'mandi-mandya',
    mandiName: 'Mandya APMC Market Yard',
    district: 'Mandya',
    commodityId: 'paddy',
    commodityName: 'Paddy (Dhan)',
    variety: 'Sona Masoori',
    minPrice: 2200,
    maxPrice: 2650,
    modalPrice: 2480,
    arrivals: 4200,
    date: '2026-10-30',
    source: 'AGMARKNET',
    isLive: true,
    unit: 'Quintal'
  },
  {
    id: 'obs-pad-mysuru-today',
    mandiId: 'mandi-mysuru',
    mandiName: 'Mysuru Bandipalya APMC',
    district: 'Mysuru',
    commodityId: 'paddy',
    commodityName: 'Paddy (Dhan)',
    variety: 'IR-64',
    minPrice: 2050,
    maxPrice: 2400,
    modalPrice: 2250,
    arrivals: 3800,
    date: '2026-10-30',
    source: 'AGMARKNET',
    isLive: true,
    unit: 'Quintal'
  },

  // Chilli
  {
    id: 'obs-chilli-hubballi-today',
    mandiId: 'mandi-hubballi',
    mandiName: 'Hubballi Amargol APMC',
    district: 'Dharwad',
    commodityId: 'chilli',
    commodityName: 'Green Chilli',
    variety: 'Byadgi Dabbi',
    minPrice: 4200,
    maxPrice: 5900,
    modalPrice: 5300,
    arrivals: 1400,
    date: '2026-10-30',
    source: 'AGMARKNET',
    isLive: true,
    unit: 'Quintal'
  },

  // Ragi
  {
    id: 'obs-ragi-mandya-today',
    mandiId: 'mandi-mandya',
    mandiName: 'Mandya APMC Market Yard',
    district: 'Mandya',
    commodityId: 'ragi',
    commodityName: 'Ragi (Finger Millet)',
    variety: 'GPU-28',
    minPrice: 3100,
    maxPrice: 3600,
    modalPrice: 3400,
    arrivals: 1200,
    date: '2026-10-30',
    source: 'AGMARKNET',
    isLive: true,
    unit: 'Quintal'
  }
];

// 15-day historical trend for Tomato (Kolar vs Yeshwantpur vs Mandya)
export const HISTORICAL_TOMATO_PRICES = [
  { date: 'Oct 16', kolar: 1950, yeshwantpur: 2150, mandya: 1700, arrivals: 4200 },
  { date: 'Oct 17', kolar: 2000, yeshwantpur: 2200, mandya: 1750, arrivals: 4500 },
  { date: 'Oct 18', kolar: 2050, yeshwantpur: 2250, mandya: 1800, arrivals: 4900 },
  { date: 'Oct 19', kolar: 2100, yeshwantpur: 2320, mandya: 1820, arrivals: 5100 },
  { date: 'Oct 20', kolar: 2080, yeshwantpur: 2300, mandya: 1800, arrivals: 5400 },
  { date: 'Oct 21', kolar: 2140, yeshwantpur: 2380, mandya: 1850, arrivals: 5800 },
  { date: 'Oct 22', kolar: 2200, yeshwantpur: 2420, mandya: 1880, arrivals: 6100 },
  { date: 'Oct 23', kolar: 2250, yeshwantpur: 2480, mandya: 1900, arrivals: 6500 },
  { date: 'Oct 24', kolar: 2220, yeshwantpur: 2450, mandya: 1880, arrivals: 6700 },
  { date: 'Oct 25', kolar: 2280, yeshwantpur: 2500, mandya: 1920, arrivals: 7000 },
  { date: 'Oct 26', kolar: 2320, yeshwantpur: 2540, mandya: 1940, arrivals: 7200 },
  { date: 'Oct 27', kolar: 2300, yeshwantpur: 2510, mandya: 1910, arrivals: 7100 },
  { date: 'Oct 28', kolar: 2340, yeshwantpur: 2530, mandya: 1930, arrivals: 7300 },
  { date: 'Oct 29', kolar: 2360, yeshwantpur: 2560, mandya: 1960, arrivals: 7350 },
  { date: 'Oct 30', kolar: 2350, yeshwantpur: 2550, mandya: 1950, arrivals: 7400 }
];

export const ACTIVE_ANOMALY_ALERTS: AnomalyAlert[] = [
  {
    id: 'anomaly-1',
    commodity: 'Tomato',
    mandi: 'Bengaluru Yeshwantpur APMC',
    category: 'SUPPLY_GLUT',
    severity: 'WARNING',
    observedValue: 6800,
    baselineValue: 4900,
    deviationPercent: 38.7,
    timestamp: '2026-10-30 08:30 IST',
    explanation: {
      en: 'Arrivals surged 38.7% above the 14-day rolling baseline due to synchronized harvest in Kolar-Chintamani belt.',
      kn: 'ಕೋಲಾರ-ಚಿಂತಾಮಣಿ ಭಾಗದಲ್ಲಿ ಏಕಕಾಲಕ್ಕೆ ಕೊಯ್ಲು ನಡೆದಿದ್ದರಿಂದ ಯಶವಂತಪುರ ಮಂಡಿಗೆ ಆವಕ ಪ್ರಮಾಣವು ಶೇ. 38.7 ಹೆಚ್ಚಾಗಿದೆ.',
      hi: 'कोलार-चिंतामणि बेल्ट में एक साथ कटाई होने से यशवंतपुर मंडी में आवक 14-दिवसीय सामान्य औसत से 38.7% बढ़ गई है।'
    },
    recommendedAction: {
      en: 'Consider dividing load or diverting 40% produce to Mysuru or local grading centers to prevent auction discount.',
      kn: 'ಹರಾಜು ಬೆಲೆ ಕುಸಿತ ತಪ್ಪಿಸಲು ಸರಕನ್ನು ವಿಭಜಿಸಿ ಅಥವಾ ಶೇ. 40 ಸರಕನ್ನು ಮೈಸೂರು ಮಂಡಿಗೆ ಕಳುಹಿಸಿ.',
      hi: 'नीलामी भाव गिरने से बचने के लिए उपज को बांटें या 40% स्टॉक मैसूरु मंडी की ओर डायवर्ट करें।'
    }
  },
  {
    id: 'anomaly-2',
    commodity: 'Onion',
    mandi: 'Hubballi Amargol APMC',
    category: 'PRICE_SPIKE',
    severity: 'INFO',
    observedValue: 2480,
    baselineValue: 2150,
    deviationPercent: 15.3,
    timestamp: '2026-10-30 09:15 IST',
    explanation: {
      en: 'Onion modal price jumped 15.3% due to delayed transit from Maharashtra Lasalgaon and increased South retail bids.',
      kn: 'ನಾಸಿಕ್ ಕಡೆಯಿಂದ ಲಾರಿಗಳ ಆಗಮನ ವಿಳಂಬವಾದ ಕಾರಣ ಹುಬ್ಬಳ್ಳಿ ಮಂಡಿಯಲ್ಲಿ ಈರುಳ್ಳಿ ದರ ಶೇ. 15.3 ಏರಿಕೆಯಾಗಿದೆ.',
      hi: 'महाराष्ट्र से आवक में देरी और दक्षिण भारत में खुदरा मांग बढ़ने से हुबली में प्याज का मॉडल भाव 15.3% उछला है।'
    },
    recommendedAction: {
      en: 'Farmers holding cured onion stocks should capture this 3-day premium before Lasalgaon trucks arrive.',
      kn: 'ಒಣಗಿಸಿಟ್ಟ ಈರುಳ್ಳಿ ಸಂಗ್ರಹವಿರುವ ರೈತರು ಮುಂದಿನ 3 ದಿನಗಳಲ್ಲಿ ಮಾರಾಟ ಮಾಡಿ ಹೆಚ್ಚಿನ ಲಾಭ ಪಡೆಯಬಹುದು.',
      hi: 'जिन किसानों के पास अच्छी तरह सूखा प्याज है वे अगले 3 दिनों में बेचकर इस बढ़े भाव का लाभ उठाएं।'
    }
  }
];

export const COLD_STORAGE_FACILITIES: ColdStorageUnit[] = [
  {
    id: 'cs-kolar-megacold',
    name: 'Kolar Agro Mega Cold Chain & Packhouse',
    location: 'Bangalore Road, Near APMC, Kolar',
    district: 'Kolar',
    capacityTonnes: 1500,
    occupiedTonnes: 820,
    availableTonnes: 680,
    monthlyRatePerBag: 42,
    tempRange: '8°C - 14°C',
    humidity: '85% - 90%',
    commoditiesStored: ['Tomato', 'Potato', 'Mango', 'Chilli'],
    contact: '+91 8152 233980'
  },
  {
    id: 'cs-yeshwantpur-cold',
    name: 'Karnataka State Warehousing Corp Cold Unit',
    location: 'APMC Yard Gate 3, Yeshwantpur, Bengaluru',
    district: 'Bengaluru Urban',
    capacityTonnes: 3000,
    occupiedTonnes: 2600,
    availableTonnes: 400,
    monthlyRatePerBag: 48,
    tempRange: '2°C - 10°C',
    humidity: '90%',
    commoditiesStored: ['Apple', 'Potato', 'Carrot', 'Tomato'],
    contact: '+91 80 2344 1190'
  },
  {
    id: 'cs-mysuru-packhouse',
    name: 'Mysuru Bandipalya Controlled Atmosphere Store',
    location: 'Ooty Road, Bandipalya, Mysuru',
    district: 'Mysuru',
    capacityTonnes: 900,
    occupiedTonnes: 430,
    availableTonnes: 470,
    monthlyRatePerBag: 38,
    tempRange: '10°C - 15°C',
    humidity: '80% - 85%',
    commoditiesStored: ['Ginger', 'Potato', 'Vegetables'],
    contact: '+91 821 249 5500'
  }
];

export const SHARED_TRANSPORT_TRIPS: SharedTransportTrip[] = [
  {
    id: 'trip-1',
    originVillage: 'Shivalli / Keragodu, Mandya',
    destinationMandi: 'Bengaluru Yeshwantpur APMC',
    destinationMandiId: 'mandi-yeshwantpur',
    departureDate: '2026-10-31',
    departureTime: '01:30 AM',
    vehicleType: 'Eicher 14ft (3.5 Ton)',
    totalCapacityQtl: 35,
    bookedCapacityQtl: 20,
    availableCapacityQtl: 15,
    driverName: 'Manjunatha Gowda',
    driverPhone: '+91 94812 44901',
    pricePerQuintal: 85,
    participatingFarmers: [
      { farmerName: 'Naveen Kumar', commodity: 'Tomato', quantityQtl: 12 },
      { farmerName: 'Chennaiah S.', commodity: 'Cabbage', quantityQtl: 8 }
    ],
    status: 'Filling Fast'
  },
  {
    id: 'trip-2',
    originVillage: 'Maddur Rural, Mandya',
    destinationMandi: 'Kolar APMC Market Yard',
    destinationMandiId: 'mandi-kolar',
    departureDate: '2026-11-01',
    departureTime: '02:00 AM',
    vehicleType: 'Eicher 17ft (6 Ton)',
    totalCapacityQtl: 60,
    bookedCapacityQtl: 35,
    availableCapacityQtl: 25,
    driverName: 'Ramesh Babu',
    driverPhone: '+91 98451 88920',
    pricePerQuintal: 110,
    participatingFarmers: [
      { farmerName: 'Shivaraju K.', commodity: 'Tomato', quantityQtl: 20 },
      { farmerName: 'Basavaraj Patil', commodity: 'Chilli', quantityQtl: 15 }
    ],
    status: 'Open'
  }
];

export const ACTIVE_PRODUCE_LISTINGS: ProduceListing[] = [
  {
    id: 'listing-1',
    farmerName: 'Naveen Kumar (Verified Farmer)',
    phone: '+91 98860 12345',
    location: 'Mandya (12 km from APMC)',
    commodity: 'Tomato',
    variety: 'Hybrid Shivam (Grade A)',
    quantityQtl: 45,
    qualityGrade: 'A (Export/Super)',
    expectedPricePerQtl: 2500,
    readyDate: '2026-11-05',
    notes: 'Firm, uniform red ripe, crated in 25kg plastic crates. Direct farm pickup available.',
    status: 'Active',
    inquiriesCount: 4
  },
  {
    id: 'listing-2',
    farmerName: 'Suresh Gowda',
    phone: '+91 94480 56789',
    location: 'Channapatna, Ramanagara',
    commodity: 'Ragi (Finger Millet)',
    variety: 'GPU-28 Clean Grain',
    quantityQtl: 80,
    qualityGrade: 'A (Export/Super)',
    expectedPricePerQtl: 3550,
    readyDate: '2026-11-02',
    notes: 'Sun-dried to 11% moisture, bagged in 50kg gunny bags. Suitable for milling or retail.',
    status: 'Negotiating',
    inquiriesCount: 7
  }
];

export const GOVERNMENT_SCHEMES_DATA: GovernmentScheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN Samman Nidhi',
    nameKn: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ',
    nameHi: 'पीएम किसान सम्मान निधि',
    beneficiary: 'Small and Marginal Landholder Farmers',
    subsidyAmount: '₹6,000 / year (3 installments of ₹2,000)',
    eligibility: [
      'Cultivable landholding in farmer’s name',
      'Aadhaar-seeded active bank account',
      'e-KYC verified on portal'
    ],
    officialPortalUrl: 'https://pmkisan.gov.in',
    verifiedDate: '2026-10-15'
  },
  {
    id: 'pmfby',
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    nameKn: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ (ಬೆಳೆ ವಿಮೆ)',
    nameHi: 'प्रधानमंत्री फसल बीमा योजना (पीएमएफबीवाय)',
    beneficiary: 'All Farmers Growing Notified Crops',
    subsidyAmount: 'Comprehensive yield loss cover; premium: 2% Kharif, 1.5% Rabi',
    eligibility: [
      'Sharecroppers & tenant farmers eligible',
      'Crop sown declaration certified by village accountant',
      'Enrollment within cut-off date via Samrakshane portal'
    ],
    officialPortalUrl: 'https://pmfby.gov.in',
    applicationDeadline: '2026-11-15',
    verifiedDate: '2026-10-20'
  },
  {
    id: 'krishi-bhagya',
    name: 'Karnataka Krishi Bhagya Scheme',
    nameKn: 'ಕರ್ನಾಟಕ ಕೃಷಿ ಭಾಗ್ಯ ಯೋಜನೆ (ಕೃಷಿ ಹೊಂಡ & ಪಾಲಿಹೌಸ್)',
    nameHi: 'कर्नाटक कृषि भाग्य योजना',
    beneficiary: 'Rainfed Dryland Farmers of Karnataka',
    subsidyAmount: 'Up to 80% subsidy for Farm Ponds (Krishi Honda) & Solar Pumps',
    eligibility: [
      'Karnataka RTC (Pahani) holder',
      'Minimum 1 acre rainfed agricultural land',
      'No previous benefit availed under same component'
    ],
    officialPortalUrl: 'https://raitamitra.karnataka.gov.in',
    verifiedDate: '2026-10-01'
  },
  {
    id: 'soil-health-card',
    name: 'Soil Health Card Scheme',
    nameKn: 'ಮಣ್ಣು ಆರೋಗ್ಯ ಪತ್ರಿಕೆ ಯೋಜನೆ',
    nameHi: 'मृदा स्वास्थ्य कार्ड योजना',
    beneficiary: 'All Agricultural Landowners',
    subsidyAmount: '100% Free Soil Nutrient Testing (12 parameters: N, P, K, pH, Micronutrients)',
    eligibility: [
      'Submit composite soil sample to nearest Taluk Raitha Samparka Kendra (RSK)',
      'Valid RTC and mobile number'
    ],
    officialPortalUrl: 'https://soilhealth.dac.gov.in',
    verifiedDate: '2026-10-10'
  }
];
