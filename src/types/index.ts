export type Language = 'en' | 'kn' | 'hi';

export type UserRole = 
  | 'farmer' 
  | 'expert' 
  | 'trader' 
  | 'fpo' 
  | 'mandi_admin' 
  | 'platform_admin';

export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  language: Language;
  state: string;
  district: string;
  village: string;
  latitude: number;
  longitude: number;
  farmSizeAcres: number;
  soilType: 'Red Sandy Loam' | 'Black Clay' | 'Alluvial' | 'Laterite' | 'Red Loamy';
  waterAvailability: 'High (Borewell/Canal)' | 'Moderate (Open Well)' | 'Rainfed';
  irrigationMethod: 'Drip' | 'Sprinkler' | 'Flood' | 'Rainfed';
  cropsCultivated: string[];
  preferredMandis: string[];
}

export interface Commodity {
  id: string;
  name: string;
  nameKn: string;
  nameHi: string;
  category: 'Vegetables' | 'Grains' | 'Pulses' | 'Commercial' | 'Spices';
  varieties: string[];
  shelfLifeDays: number;
  storageTempC: number;
  standardMoisturePercent: number;
  defaultUnit: 'Quintal' | 'Kg' | 'Tonne';
}

export interface Mandi {
  id: string;
  name: string;
  nameKn: string;
  nameHi: string;
  state: string;
  district: string;
  latitude: number;
  longitude: number;
  dailyCapacityTonnes: number;
  currentArrivalsTonnes: number;
  congestionStatus: 'Free' | 'Moderate' | 'Congested' | 'Gate Hold';
  coldStorageAvailable: boolean;
  coldStorageCapacityTonnes: number;
  operatingHours: string;
  marketFeePercent: number; // APMC cess typically 1.5% - 2.0%
  unloadingChargePerQtl: number;
  supportedCommodities: string[];
  contactNumber: string;
  isVerified: boolean;
  lastUpdated: string;
  updatedBy: string;
}

export interface MarketObservation {
  id: string;
  mandiId: string;
  mandiName: string;
  district: string;
  commodityId: string;
  commodityName: string;
  variety: string;
  minPrice: number; // INR per quintal
  maxPrice: number;
  modalPrice: number;
  arrivals: number; // in Quintals
  date: string;
  source: 'AGMARKNET' | 'DATA_GOV_IN' | 'APMC_PORTAL' | 'ADMIN_ENTRY';
  isLive: boolean;
  unit: 'Quintal';
}

export interface PriceForecastPoint {
  date: string;
  dayHorizon: 1 | 3 | 7 | 14;
  expectedPrice: number;
  lowerConfidence90: number;
  upperConfidence90: number;
  expectedArrivalsQtl: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
  confidenceScore: number; // 0 to 1
  volatilityIndex: 'Low' | 'Moderate' | 'High';
  keyDrivers: {
    feature: string;
    impactPercentage: number;
    direction: 'positive' | 'negative';
  }[];
}

export interface MandiAllocationScenario {
  scenarioId: string;
  title: string;
  description: string;
  allocations: {
    mandiId: string;
    mandiName: string;
    distanceKm: number;
    quantityQtl: number;
    expectedModalPrice: number;
    grossRevenue: number;
    transportCost: number;
    handlingCost: number;
    marketFees: number;
    spoilageLoss: number;
    netRealization: number;
    netPricePerKg: number;
  }[];
  totalGrossRevenue: number;
  totalExpenses: number;
  totalNetRealization: number;
  averageNetRealizationPerQtl: number;
  recommendationRank: number;
  riskAssessment: 'Low Risk' | 'Balanced' | 'High Uncertainty';
  aiExplanation: {
    en: string;
    kn: string;
    hi: string;
  };
}

export interface AnomalyAlert {
  id: string;
  commodity: string;
  mandi: string;
  category: 'PRICE_CRASH' | 'PRICE_SPIKE' | 'SUPPLY_GLUT' | 'SHORTAGE' | 'VOLATILITY_ALERT';
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  observedValue: number;
  baselineValue: number;
  deviationPercent: number;
  timestamp: string;
  explanation: {
    en: string;
    kn: string;
    hi: string;
  };
  recommendedAction: {
    en: string;
    kn: string;
    hi: string;
  };
}

export interface CropDiseaseDiagnosis {
  id: string;
  crop: string;
  plantPart: string;
  symptomsReported: string[];
  imageUrl?: string;
  identifiedDisease: string;
  identifiedDiseaseKn: string;
  identifiedDiseaseHi: string;
  confidenceScore: number;
  causativeAgent: 'Fungal' | 'Bacterial' | 'Viral' | 'Pest' | 'Nutrient Deficiency';
  organicTreatments: string[];
  chemicalTreatmentsICAR: string[];
  preventiveMeasures: string[];
  expertEscalationNeeded: boolean;
  createdAt: string;
}

export interface SharedTransportTrip {
  id: string;
  originVillage: string;
  destinationMandi: string;
  destinationMandiId: string;
  departureDate: string;
  departureTime: string;
  vehicleType: 'Tata Ace (1 Ton)' | 'Eicher 14ft (3.5 Ton)' | 'Eicher 17ft (6 Ton)' | 'Tractor Trailer (3 Ton)';
  totalCapacityQtl: number;
  bookedCapacityQtl: number;
  availableCapacityQtl: number;
  driverName: string;
  driverPhone: string;
  pricePerQuintal: number;
  participatingFarmers: {
    farmerName: string;
    commodity: string;
    quantityQtl: number;
  }[];
  status: 'Open' | 'Filling Fast' | 'Confirmed' | 'Departed';
}

export interface ProduceListing {
  id: string;
  farmerName: string;
  phone: string;
  location: string;
  commodity: string;
  variety: string;
  quantityQtl: number;
  qualityGrade: 'A (Export/Super)' | 'B (Standard Mandi)' | 'C (Processing)';
  expectedPricePerQtl: number;
  readyDate: string;
  notes: string;
  status: 'Active' | 'Negotiating' | 'Sold';
  inquiriesCount: number;
}

export interface ColdStorageUnit {
  id: string;
  name: string;
  location: string;
  district: string;
  capacityTonnes: number;
  occupiedTonnes: number;
  availableTonnes: number;
  monthlyRatePerBag: number;
  tempRange: string;
  humidity: string;
  commoditiesStored: string[];
  contact: string;
}

export interface FinancialRecord {
  id: string;
  crop: string;
  season: 'Kharif 2026' | 'Rabi 2026' | 'Summer 2026';
  category: 'Seeds' | 'Fertilizer' | 'Labour' | 'Irrigation' | 'Transport' | 'Pesticides' | 'Sales Revenue';
  amount: number;
  type: 'Expense' | 'Revenue';
  date: string;
  notes: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorRole: string;
  district: string;
  originalLanguage: Language;
  content: {
    en: string;
    kn: string;
    hi: string;
  };
  cropTag: string;
  likes: number;
  repliesCount: number;
  timestamp: string;
  isExpertAnswered: boolean;
  replies?: {
    id: string;
    authorName: string;
    isExpert: boolean;
    text: string;
    timestamp: string;
  }[];
}

export interface GovernmentScheme {
  id: string;
  name: string;
  nameKn: string;
  nameHi: string;
  beneficiary: string;
  subsidyAmount: string;
  eligibility: string[];
  officialPortalUrl: string;
  applicationDeadline?: string;
  verifiedDate: string;
}

export interface CommodityCapacityBreakdown {
  commodity: string;
  allocatedBays: number;
  totalBays: number;
  currentArrivalsTonnes: number;
  maxCapacityTonnes: number;
  status: 'Normal' | 'Near Full' | 'Full';
}

export interface FutureCongestionPrediction {
  timeHorizon: 'Today Evening' | 'Tomorrow Morning' | 'In 48 Hours' | 'In 72 Hours';
  predictedArrivalsTonnes: number;
  congestionProbability: number;
  riskLevel: 'Low' | 'Moderate' | 'Severe';
  recommendedArrivalWindow: string;
}

export interface DigitalTwinBlock {
  blockId: string;
  name: string;
  areaAcres: number;
  crop: string;
  variety: string;
  sowingDate: string;
  stage: 'Nursery' | 'Vegetative' | 'Flowering' | 'Fruit Maturation' | 'Harvest Ready';
  daysToHarvest: number;
  healthScorePercent: number;
  soilMoisturePercent: number;
  nitrogenStatus: 'Deficient' | 'Optimal' | 'Excess';
  phosphorusStatus: 'Optimal' | 'Low';
  potassiumStatus: 'Optimal' | 'Low';
  phLevel: number;
  predictedYieldQtl: number;
}

export interface WhatIfSimulationResult {
  scenarioName: string;
  priceShockPercent: number;
  simulatedPricePerQtl: number;
  simulatedGrossRevenue: number;
  simulatedTotalCosts: number;
  simulatedNetRealization: number;
  varianceFromBaseline: number;
  recommendedMitigationStrategy: {
    en: string;
    kn: string;
    hi: string;
  };
}

export interface HarvestReadinessItem {
  id: string;
  crop: string;
  variety: string;
  maturityScorePercent: number;
  colorStage: 'Breaker (10% color)' | 'Turning (30%)' | 'Pink (60%)' | 'Light Red' | 'Full Red Ripe';
  firmnessKgCm2: number;
  brixSugarContent: number;
  recommendedHarvestDate: string;
  optimalSellingWindow: string;
  gradeAEstPercent: number;
  gradeBEstPercent: number;
  gradeCEstPercent: number;
  weatherRiskDuringHarvest: 'No Risk' | 'Rain Warning' | 'High Temperature';
}

export interface CollectiveHarvestIntention {
  id: string;
  village: string;
  district: string;
  commodity: string;
  totalExpectedQtl: number;
  participatingFarmersCount: number;
  expectedHarvestWeek: string;
  oversupplyRisk: 'Low' | 'Moderate' | 'Critical Glut Risk';
  targetMandis: string[];
  collectiveFpoBuyer?: string;
}

export interface ExpertConsultationRequest {
  id: string;
  farmerName: string;
  farmerPhone: string;
  district: string;
  crop: string;
  problemSummary: string;
  leafImageUrl?: string;
  status: 'Pending' | 'Prescribed' | 'Follow-Up Needed';
  createdAt: string;
  expertPrescription?: {
    expertName: string;
    diagnosis: string;
    recommendedTreatment: string;
    waitingPeriodDays: number;
    prescribedAt: string;
  };
}

