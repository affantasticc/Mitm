export interface DiseaseKnowledgeEntry {
  crop: string;
  diseaseName: string;
  diseaseNameKn: string;
  diseaseNameHi: string;
  causativeAgent: 'Fungal' | 'Bacterial' | 'Viral' | 'Pest' | 'Nutrient Deficiency';
  symptoms: string[];
  organicTreatments: string[];
  chemicalTreatmentsICAR: string[];
  preventiveMeasures: string[];
  dangerLevel: 'Low' | 'Moderate' | 'Severe';
  sampleImages: string[];
}

export const CROP_DISEASES_KB: DiseaseKnowledgeEntry[] = [
  {
    crop: 'Tomato',
    diseaseName: 'Early Blight (Alternaria solani)',
    diseaseNameKn: 'ಟೊಮ್ಯಾಟೊ ಎಲೆ ಚುಕ್ಕೆ ರೋಗ (ಅಲ್ಟರ್ನೇರಿಯಾ)',
    diseaseNameHi: 'टमाटर का अगेती झुलसा (अल्टरनेरिया सोलेनाई)',
    causativeAgent: 'Fungal',
    symptoms: [
      'Concentric dark brown rings resembling a target board on lower leaves',
      'Yellow chlorotic halos around circular spots',
      'Stem cankers and leaf premature drop in humid weather'
    ],
    organicTreatments: [
      'Spray Trichoderma harzianum @ 5g/litre of water',
      'Neem seed kernel extract (NSKE 5%) or cold-pressed Neem oil (3ml/L) with soap',
      'Copper oxychloride organic formulation @ 2.5g/L'
    ],
    chemicalTreatmentsICAR: [
      'Mancozeb 75% WP @ 2g/L water at first sign of lesions',
      'Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1ml/L for heavy infection',
      'Follow 7-day waiting period before harvest after spraying'
    ],
    preventiveMeasures: [
      'Mulch soil around tomato base to prevent fungal soil-splash during drip/rain',
      'Ensure 60cm row spacing for good air circulation',
      'Destroy crop debris post-harvest'
    ],
    dangerLevel: 'Moderate',
    sampleImages: ['/assets/diseases/tomato_early_blight.jpg']
  },
  {
    crop: 'Tomato',
    diseaseName: 'Tomato Leaf Curl Virus (ToLCV)',
    diseaseNameKn: 'ಟೊಮ್ಯಾಟೊ ಎಲೆ ಮುರುಟು ರೋಗ (ವೈರಸ್)',
    diseaseNameHi: 'टमाटर का पत्ता मरोड़ वायरस (लीफ कर्ल)',
    causativeAgent: 'Viral',
    symptoms: [
      'Upward curling and crinkling of young leaves',
      'Severe stunting of plant with bushy appearance',
      'Thickened veins and failure of fruit set'
    ],
    organicTreatments: [
      'Install yellow sticky traps (10-15 traps/acre) to trap Whitefly vectors (Bemisia tabaci)',
      'Spray 5% Neem oil at 5-day intervals during initial vegetative stage',
      'Intercrop with 2 rows of Maize or Marigold as physical barrier crops'
    ],
    chemicalTreatmentsICAR: [
      'Control whitefly vector: Diafenthiuron 50% WP @ 1g/L or Acetamiprid 20% SP @ 0.3g/L',
      'Rogor (Dimethoate 30% EC) @ 1.7ml/L if whitefly nymph count > 5/leaf'
    ],
    preventiveMeasures: [
      'Grow resistant hybrids like Arka Rakshak or US-440',
      'Rogue out and burn infected plants early before spread'
    ],
    dangerLevel: 'Severe',
    sampleImages: ['/assets/diseases/tomato_leaf_curl.jpg']
  },
  {
    crop: 'Paddy',
    diseaseName: 'Rice Blast (Magnaporthe oryzae)',
    diseaseNameKn: 'ಭತ್ತದ ಬೆಂಕಿ ರೋಗ (ಬ್ಲಾಸ್ಟ್)',
    diseaseNameHi: 'धान का झोंका रोग (ब्लास्ट)',
    causativeAgent: 'Fungal',
    symptoms: [
      'Spindle-shaped or eye-shaped lesions with ash-grey centers and brown margins on leaf blades',
      'Neck rot causing unfilled panicles with chaffy grains (neck blast)'
    ],
    organicTreatments: [
      'Seed treatment with Pseudomonas fluorescens @ 10g/kg seed',
      'Foliar spray with fermented buttermilk + Hing (Asafoetida) solution'
    ],
    chemicalTreatmentsICAR: [
      'Tricyclazole 75% WP @ 0.6g/L water (very effective prophylactic)',
      'Isoprothiolane 40% EC @ 1.5ml/L at boot-leaf stage'
    ],
    preventiveMeasures: [
      'Avoid excessive split application of Nitrogenous fertilizer (Urea)',
      'Drain excess standing water periodically to reduce canopy humidity'
    ],
    dangerLevel: 'Severe',
    sampleImages: ['/assets/diseases/paddy_blast.jpg']
  },
  {
    crop: 'Onion',
    diseaseName: 'Purple Blotch (Alternaria porri)',
    diseaseNameKn: 'ಈರುಳ್ಳಿ ನೇರಳೆ ಚುಕ್ಕೆ ರೋಗ',
    diseaseNameHi: 'प्याज का बैंगनी धब्बा रोग (पर्पल ब्लॉच)',
    causativeAgent: 'Fungal',
    symptoms: [
      'Small, water-soaked lesions turning purple-brown with distinct concentric bands',
      'Lesions girdle leaf tips causing downward folding and drying'
    ],
    organicTreatments: [
      'Spray bio-fungicide Bacillus subtilis @ 5g/L',
      'Panchagavya foliar spray (3%) mixed with soapnut solution'
    ],
    chemicalTreatmentsICAR: [
      'Tebuconazole 25.9% EC @ 1.25ml/L water',
      'Chlorothalonil 75% WP @ 2g/L along with sticking agent (Wettable adjuvant)'
    ],
    preventiveMeasures: [
      'Ensure proper bulb drying (curing) for 10-14 days before storage',
      'Avoid overhead sprinkler irrigation in mature crop'
    ],
    dangerLevel: 'Moderate',
    sampleImages: ['/assets/diseases/onion_purple_blotch.jpg']
  },
  {
    crop: 'Maize',
    diseaseName: 'Fall Armyworm (Spodoptera frugiperda)',
    diseaseNameKn: 'ಮೆಕ್ಕೆಜೋಳದ ಸೈನಿಕ ಹುಳು (ಆರ್ಮಿವರ್ಮ್)',
    diseaseNameHi: 'मक्का का फाल आर्मीवर्म कीट',
    causativeAgent: 'Pest',
    symptoms: [
      'Window-pane feeding holes on young whorl leaves',
      'Abundant sawdust-like frass inside central plant whorl',
      'Deep shot-hole damage on expanding blades'
    ],
    organicTreatments: [
      'Apply dry sand or wood ash + lime (9:1) directly into central whorls',
      'Spray Metarhizium rileyi or Beauveria bassiana @ 5g/L',
      'Install pheromone traps @ 5 traps/acre for male moth monitoring'
    ],
    chemicalTreatmentsICAR: [
      'Emamectin Benzoate 5% SG @ 0.4g/L directly into plant whorls',
      'Chlorantraniliprole 18.5% SC @ 0.4ml/L if > 10% plants show fresh whorl damage'
    ],
    preventiveMeasures: [
      'Deep summer ploughing to expose pupae to predatory birds',
      'Timely synchronized community sowing in the village'
    ],
    dangerLevel: 'Severe',
    sampleImages: ['/assets/diseases/maize_armyworm.jpg']
  }
];

export const CROP_RECOMMENDATIONS_KB = [
  {
    crop: 'Tomato (Hybrid Arka Rakshak / Shivam)',
    soilSuitability: ['Red Sandy Loam', 'Red Loamy', 'Black Clay'],
    season: 'Rabi / Post-Monsoon (Oct - Feb)',
    durationDays: '110 - 130 days',
    waterRequirement: 'Moderate (Drip irrigation recommended)',
    estimatedCostPerAcre: 62000,
    expectedYieldQtlPerAcre: 180,
    projectedAvgPricePerQtl: 2400,
    estimatedGrossPerAcre: 432000,
    estimatedNetProfitPerAcre: 370000,
    riskRating: 'Medium (Price volatility)',
    keyAdvantage: 'High Net Realization in winter months with strong urban Bengaluru demand.'
  },
  {
    crop: 'Onion (Bellary Red)',
    soilSuitability: ['Red Sandy Loam', 'Alluvial', 'Black Clay'],
    season: 'Kharif / Late Kharif (Aug - Nov)',
    durationDays: '90 - 110 days',
    waterRequirement: 'Moderate',
    estimatedCostPerAcre: 48000,
    expectedYieldQtlPerAcre: 120,
    projectedAvgPricePerQtl: 2600,
    estimatedGrossPerAcre: 312000,
    estimatedNetProfitPerAcre: 264000,
    riskRating: 'Medium-Low (Can be cured & stored if price dips)',
    keyAdvantage: 'Excellent storage life; low perishability compared to tomato.'
  },
  {
    crop: 'Ragi (Finger Millet - GPU-28 / ML-365)',
    soilSuitability: ['Red Sandy Loam', 'Laterite', 'Red Loamy'],
    season: 'Kharif / Rainfed (July - Nov)',
    durationDays: '105 - 115 days',
    waterRequirement: 'Low (Drought resilient)',
    estimatedCostPerAcre: 22000,
    expectedYieldQtlPerAcre: 16,
    projectedAvgPricePerQtl: 3500,
    estimatedGrossPerAcre: 56000,
    estimatedNetProfitPerAcre: 34000,
    riskRating: 'Very Low (Guaranteed MSP & state procurement)',
    keyAdvantage: 'Extremely resilient to dry spells, lowest input cost, assured MSP.'
  },
  {
    crop: 'Paddy (Sona Masoori)',
    soilSuitability: ['Black Clay', 'Alluvial'],
    season: 'Kharif / Rabi with Canal/Borewell',
    durationDays: '135 - 150 days',
    waterRequirement: 'High',
    estimatedCostPerAcre: 38000,
    expectedYieldQtlPerAcre: 28,
    projectedAvgPricePerQtl: 2450,
    estimatedGrossPerAcre: 68600,
    estimatedNetProfitPerAcre: 30600,
    riskRating: 'Low-Medium (Water dependent)',
    keyAdvantage: 'High liquidity in Mandya/Mysuru mandis with consistent millers demand.'
  }
];
