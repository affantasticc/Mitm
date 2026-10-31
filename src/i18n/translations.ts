import { Language } from '../types';

export interface Translations {
  appName: string;
  appTagline: string;
  nav: {
    dashboard: string;
    marketPrices: string;
    priceForecast: string;
    allocationOptimizer: string;
    mandiCapacity: string;
    cropHealth: string;
    cropSelection: string;
    weather: string;
    interactiveMap: string;
    transportSharing: string;
    buyerMarket: string;
    storage: string;
    finance: string;
    community: string;
    schemes: string;
    adminPortal: string;
    aiAssistant: string;
    marketAnalytics: string;
    digitalTwin: string;
    harvestPlanning: string;
    expertPortal: string;
  };
  common: {
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    submit: string;
    loading: string;
    search: string;
    filter: string;
    all: string;
    today: string;
    viewDetails: string;
    status: string;
    date: string;
    quintal: string;
    kg: string;
    tonne: string;
    inr: string;
    distance: string;
    verified: string;
    demoData: string;
    liveSource: string;
    switchRole: string;
    voiceQuery: string;
    speaking: string;
    listen: string;
    netRealization: string;
    grossRevenue: string;
    totalCost: string;
    profit: string;
  };
  dashboard: {
    welcomeFarmer: string;
    overviewSubtitle: string;
    weatherCardTitle: string;
    activeCrops: string;
    growthStage: string;
    expectedHarvest: string;
    estimatedYield: string;
    currentModalPrice: string;
    topMandiNotice: string;
    priceForecastTrend: string;
    actions: string;
    alertsTitle: string;
    realizationSummary: string;
  };
  market: {
    title: string;
    subtitle: string;
    selectCommodity: string;
    selectDistrict: string;
    selectMandi: string;
    modalPrice: string;
    minPrice: string;
    maxPrice: string;
    arrivalsQtl: string;
    historicalTrend: string;
    dataSourceNotice: string;
    lastUpdated: string;
    compareMandis: string;
  };
  forecast: {
    title: string;
    subtitle: string;
    horizon1d: string;
    horizon3d: string;
    horizon7d: string;
    horizon14d: string;
    expectedPrice: string;
    confidenceInterval: string;
    keyDrivers: string;
    modelAccuracy: string;
    backtestComparison: string;
    disclaimer: string;
  };
  optimizer: {
    title: string;
    subtitle: string;
    inputHarvest: string;
    harvestDate: string;
    maxRadius: string;
    runOptimization: string;
    bestScenario: string;
    scenarioA: string;
    scenarioB: string;
    scenarioC: string;
    scenarioD: string;
    transportExpense: string;
    handlingExpense: string;
    apmcCess: string;
    spoilageLoss: string;
    netRealizedPerQtl: string;
    recommendedSplit: string;
    aiJustification: string;
  };
  capacity: {
    title: string;
    subtitle: string;
    dailyLimit: string;
    arrivalsToday: string;
    availableCapacity: string;
    utilizationPercent: string;
    congestionState: string;
    updateCapacityAdmin: string;
    coldStorageStatus: string;
  };
  cropHealth: {
    title: string;
    subtitle: string;
    uploadPhoto: string;
    takePhoto: string;
    selectPart: string;
    describeSymptoms: string;
    diagnoseButton: string;
    diagnosisResult: string;
    confidence: string;
    organicCure: string;
    chemicalCure: string;
    preventiveCare: string;
    escalateExpert: string;
    recentDiagnoses: string;
  };
  voice: {
    modalTitle: string;
    listening: string;
    speakNow: string;
    trySaying: string;
    example1: string;
    example2: string;
    example3: string;
    processing: string;
    audioAnswer: string;
  };
  ai: {
    assistantTitle: string;
    assistantSubtitle: string;
    placeholder: string;
    send: string;
    suggested1: string;
    suggested2: string;
    suggested3: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "MANDI AI 2.0",
    appTagline: "Farmer Net Realization & Multi-Mandi Optimization Platform",
    nav: {
      dashboard: "Farmer Dashboard",
      marketPrices: "Live Mandi Prices",
      priceForecast: "AI Price Forecasts",
      allocationOptimizer: "Mandi Allocator",
      mandiCapacity: "Mandi Capacity",
      cropHealth: "Crop Health & Vision",
      cropSelection: "Crop Advisory",
      weather: "Weather Intelligence",
      interactiveMap: "Agri GIS Map",
      transportSharing: "Shared Transport",
      buyerMarket: "Buyer Marketplace",
      storage: "Cold Storage",
      finance: "Farm Finances",
      community: "Kisan Community",
      schemes: "Govt Schemes",
      adminPortal: "Admin & Data Sources",
      aiAssistant: "Mandi AI Assistant",
      marketAnalytics: "Graphs & Market Analytics",
      digitalTwin: "Farm Digital Twin Simulator",
      harvestPlanning: "Harvest & Yield Intelligence",
      expertPortal: "Agri Expert Portal"
    },
    common: {
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      submit: "Submit",
      loading: "Processing...",
      search: "Search Mandi or Crop...",
      filter: "Filter",
      all: "All",
      today: "Today",
      viewDetails: "View Details",
      status: "Status",
      date: "Date",
      quintal: "Quintal (100 kg)",
      kg: "Kilogram (kg)",
      tonne: "Metric Tonne",
      inr: "₹",
      distance: "Distance",
      verified: "Official Verified",
      demoData: "SIMULATED / DEMO",
      liveSource: "Agmarknet Live Sync",
      switchRole: "Role:",
      voiceQuery: "Voice Assistant",
      speaking: "Speaking...",
      listen: "Listen (TTS)",
      netRealization: "Net Realization",
      grossRevenue: "Gross Revenue",
      totalCost: "Total Deductions",
      profit: "Expected Profit"
    },
    dashboard: {
      welcomeFarmer: "Namaskara, Naveen Kumar",
      overviewSubtitle: "Mandya District · 4.5 Acres · Red Sandy Loam · Borewell Drip",
      weatherCardTitle: "Weather & Spray Advisory",
      activeCrops: "Active Cultivations",
      growthStage: "Stage: Flowering / Fruit Set",
      expectedHarvest: "Harvest in 6 Days",
      estimatedYield: "Estimated: 45 Quintals",
      currentModalPrice: "Current Market Modal",
      topMandiNotice: "Top Net Realization Mandi",
      priceForecastTrend: "7-Day Price Forecast",
      actions: "Instant Decision Tools",
      alertsTitle: "Urgent Market & Agronomy Alerts",
      realizationSummary: "Projected Net Realization"
    },
    market: {
      title: "Live Agricultural Market Intelligence",
      subtitle: "Official Agmarknet Daily Modal, Minimum, Maximum Prices & Inflow Quantities",
      selectCommodity: "Commodity",
      selectDistrict: "District",
      selectMandi: "Mandi / APMC Yard",
      modalPrice: "Modal Price",
      minPrice: "Min Price",
      maxPrice: "Max Price",
      arrivalsQtl: "Arrivals (Qtl)",
      historicalTrend: "Price Trend (Last 15 Days)",
      dataSourceNotice: "Data Ingested from AGMARKNET & State APMC Open Portals",
      lastUpdated: "Last Synced: Today 10:30 AM IST",
      compareMandis: "Compare Mandis"
    },
    forecast: {
      title: "AI Machine-Learning Price Forecasting",
      subtitle: "Quantile Regression & Gradient Boosting 1 to 14-day Ahead Modal Price Projections",
      horizon1d: "1 Day Ahead",
      horizon3d: "3 Days Ahead",
      horizon7d: "7 Days Ahead",
      horizon14d: "14 Days Ahead",
      expectedPrice: "Expected Modal Price",
      confidenceInterval: "90% Confidence Interval Band",
      keyDrivers: "Key Predictive Drivers (SHAP Importance)",
      modelAccuracy: "Model Backtest Accuracy (sMAPE 4.2% · MAE ₹94/qtl)",
      backtestComparison: "Forecast vs Actual Verification",
      disclaimer: "Forecasts reflect probabilistic market econometric estimates. Do not treat as guaranteed contracts."
    },
    optimizer: {
      title: "Intelligent Multi-Mandi Allocation Engine",
      subtitle: "Linear Optimization Maximizing Net Farmer Realization After Transport, Handling, APMC Cess & Spoilage",
      inputHarvest: "Harvest Quantity Ready (Quintals)",
      harvestDate: "Planned Harvest Date",
      maxRadius: "Search Radius (km)",
      runOptimization: "Optimize Allocation & Net Realization",
      bestScenario: "Optimal Recommendation",
      scenarioA: "Scenario A: Sell 100% Immediately to Closest Mandi",
      scenarioB: "Scenario B: Hold 4 Days for Forecasted Price Peak",
      scenarioC: "Scenario C: Dual-Mandi Allocation (Best Spread)",
      scenarioD: "Scenario D: Cold Storage 10 Days then Sell",
      transportExpense: "Freight & Diesel Cost",
      handlingExpense: "Hamali / Unloading & Weighing",
      apmcCess: "APMC Market Fee (1.5%)",
      spoilageLoss: "Transit Spoilage & Weight Shrinkage",
      netRealizedPerQtl: "Net Realized ₹/Quintal",
      recommendedSplit: "Recommended Delivery Breakdown",
      aiJustification: "Economic Rationale & Allocation Explanation"
    },
    capacity: {
      title: "Mandi Capacity & Congestion Management",
      subtitle: "Daily Handling Ceilings, Live Inflow & Yard Gate Congestion Alerts",
      dailyLimit: "Daily Capacity Limit",
      arrivalsToday: "Today's Arrivals",
      availableCapacity: "Available Unloading Capacity",
      utilizationPercent: "Capacity Utilization",
      congestionState: "Yard Traffic & Yard Status",
      updateCapacityAdmin: "Update Mandi Capacity (Admin)",
      coldStorageStatus: "Cold Storage Facility Status"
    },
    cropHealth: {
      title: "AI Crop Health & Disease Diagnosis",
      subtitle: "Computer Vision Plant Pathology with ICAR/KVK Certified Safe Treatments",
      uploadPhoto: "Upload Plant Photograph",
      takePhoto: "Take Photo with Camera",
      selectPart: "Affected Part",
      describeSymptoms: "Observed Symptoms",
      diagnoseButton: "Run AI Vision Pathology Diagnosis",
      diagnosisResult: "Pathology Diagnosis",
      confidence: "Model Confidence",
      organicCure: "Organic & Bio-Control Remedies",
      chemicalCure: "ICAR Approved Chemical Treatment",
      preventiveCare: "Preventive Cultural Practices",
      escalateExpert: "Escalate Case to KVK Scientist",
      recentDiagnoses: "Farmer Diagnosis History"
    },
    voice: {
      modalTitle: "Mandi AI Voice Assistant",
      listening: "Listening to your voice...",
      speakNow: "Speak naturally in Kannada, Hindi, or English",
      trySaying: "Try asking:",
      example1: "Which mandi gives me the highest profit for 30 quintals of tomato?",
      example2: "Will onion prices in Yeshwantpur increase next week?",
      example3: "Is my tomato leaf spot a fungal disease? What should I spray?",
      processing: "Analyzing query & optimizing market realization...",
      audioAnswer: "Voice Response"
    },
    ai: {
      assistantTitle: "Mandi AI Agricultural Advisor",
      assistantSubtitle: "Context-aware conversational intelligence grounded in real APMC prices & ICAR agronomy",
      placeholder: "Ask about crops, mandis, prices, diseases, weather...",
      send: "Send",
      suggested1: "Which mandi gives me highest net profit for tomato?",
      suggested2: "Should I sell now or wait 5 days?",
      suggested3: "Recommend best variety for red sandy loam soil"
    }
  },
  kn: {
    appName: "ಮಂಡಿ AI 2.0",
    appTagline: "ರೈತರ ನಿವ್ವಳ ಲಾಭ ಮತ್ತು ಬಹು-ಮಾರುಕಟ್ಟೆ ಹಂಚಿಕೆ ವೇದಿಕೆ",
    nav: {
      dashboard: "ರೈತರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      marketPrices: "ಲೈವ್ ಮಂಡಿ ಬೆಲೆಗಳು",
      priceForecast: "AI ಬೆಲೆ ಮುನ್ಸೂಚನೆ",
      allocationOptimizer: "ಮಾರುಕಟ್ಟೆ ಹಂಚಿಕೆ ಯಂತ್ರ",
      mandiCapacity: "ಮಂಡಿ ಸಾಮರ್ಥ್ಯ",
      cropHealth: "ಬೆಳೆ ರೋಗ ಪತ್ತೆ",
      cropSelection: "ಬೆಳೆ ಶಿಫಾರಸು",
      weather: "ಹವಾಮಾನ ಮಾಹಿತಿ",
      interactiveMap: "ಕೃಷಿ ನಕ್ಷೆ",
      transportSharing: "ಸಾರಿಗೆ ಹಂಚಿಕೆ",
      buyerMarket: "ಖರೀದಿದಾರರ ಮಾರುಕಟ್ಟೆ",
      storage: "ಶೀತಲ ಗೋದಾಮು",
      finance: "ಕೃಷಿ ಖರ್ಚು-ವೆಚ್ಚ",
      community: "ರೈತರ ಸಮುದಾಯ",
      schemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
      adminPortal: "ಆಡಳಿತ & ಡೇಟಾ ಮೂಲಗಳು",
      aiAssistant: "ಮಂಡಿ AI ಸಹಾಯಕ",
      marketAnalytics: "ಮಾರುಕಟ್ಟೆ ಚಾರ್ಟ್ಸ್ & ಅಂಕಿಅಂಶ",
      digitalTwin: "ಡಿಜಿಟಲ್ ಫಾರ್ಮ್ ಸಿಮ್ಯುಲೇಟರ್",
      harvestPlanning: "ಕೊಯ್ಲು & ಇಳುವರಿ ಮಾಹಿತಿ",
      expertPortal: "ಕೃಷಿ ತಜ್ಞರ ಪೋರ್ಟಲ್"
    },
    common: {
      save: "ಉಳಿಸಿ",
      cancel: "ರದ್ದುಮಾಡಿ",
      delete: "ಅಳಿಸಿ",
      edit: "ಬದಲಾಯಿಸಿ",
      submit: "ಸಲ್ಲಿಸಿ",
      loading: "ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ...",
      search: "ಮಂಡಿ ಅಥವಾ ಬೆಳೆ ಹುಡುಕಿ...",
      filter: "ಫಿಲ್ಟರ್",
      all: "ಎಲ್ಲಾ",
      today: "ಇಂದು",
      viewDetails: "ವಿವರ ನೋಡಿ",
      status: "ಸ್ಥಿತಿ",
      date: "ದಿನಾಂಕ",
      quintal: "ಕ್ವಿಂಟಾಲ್ (100 ಕೆ.ಜಿ)",
      kg: "ಕಿಲೋಗ್ರಾಂ (ಕೆ.ಜಿ)",
      tonne: "ಮೆಟ್ರಿಕ್ ಟನ್",
      inr: "₹",
      distance: "ದೂರ",
      verified: "ಅಧಿಕೃತ ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
      demoData: "ಪ್ರದರ್ಶನ ಡೇಟಾ",
      liveSource: "ಅಗ್ಮಾರ್ಕ್‌ನೆಟ್ ಲೈವ್",
      switchRole: "ಪಾತ್ರ:",
      voiceQuery: "ಧ್ವನಿ ಸಹಾಯಕ",
      speaking: "ಮಾತನಾಡುತ್ತಿದೆ...",
      listen: "ಆಲಿಸಿ (ಧ್ವನಿ)",
      netRealization: "ನಿವ್ವಳ ಲಾಭ",
      grossRevenue: "ಒಟ್ಟು ಆದಾಯ",
      totalCost: "ಒಟ್ಟು ಕಡಿತಗಳು",
      profit: "ನಿರೀಕ್ಷಿತ ಲಾಭ"
    },
    dashboard: {
      welcomeFarmer: "ನಮಸ್ಕಾರ, ನವೀನ್ ಕುಮಾರ್",
      overviewSubtitle: "ಮಂಡ್ಯ ಜಿಲ್ಲೆ · 4.5 ಎಕರೆ · ಕೆಂಪು ಮರಳು ಮಣ್ಣು · ಬೋರ್‌ವೆಲ್ ಹನಿ ನೀರಾವರಿ",
      weatherCardTitle: "ಹವಾಮಾನ ಮತ್ತು ಔಷಧಿ ಸಿಂಪರಣೆ ಸಲಹೆ",
      activeCrops: "ಹಾಲಿ ಬೆಳೆಗಳು",
      growthStage: "ಹಂತ: ಹೂ ಬಿಡುವ / ಕಾಯಿ ಕಚ್ಚುವ ಸಮಯ",
      expectedHarvest: "6 ದಿನಗಳಲ್ಲಿ ಕೊಯ್ಲು ಸಿದ್ಧ",
      estimatedYield: "ಅಂದಾಜು ಇಳುವರಿ: 45 ಕ್ವಿಂಟಾಲ್",
      currentModalPrice: "ಮಾರುಕಟ್ಟೆ ಮಾದರಿ ಬೆಲೆ",
      topMandiNotice: "ಅತ್ಯಧಿಕ ನಿವ್ವಳ ಲಾಭ ಕೊಡುವ ಮಂಡಿ",
      priceForecastTrend: "7 ದಿನಗಳ ಬೆಲೆ ಮುನ್ಸೂಚನೆ",
      actions: "ತ್ವರಿತ ನಿರ್ಧಾರ ಸಾಧನಗಳು",
      alertsTitle: "ತುರ್ತು ಮಾರುಕಟ್ಟೆ & ಬೆಳೆ ಎಚ್ಚರಿಕೆಗಳು",
      realizationSummary: "ನಿರೀಕ್ಷಿತ ನಿವ್ವಳ ಆದಾಯ"
    },
    market: {
      title: "ಲೈವ್ ಕೃಷಿ ಮಾರುಕಟ್ಟೆ ದರಗಳು",
      subtitle: "ಅಧಿಕೃತ ಅಗ್ಮಾರ್ಕ್‌ನೆಟ್ ದೈನಂದಿನ ಮಾದರಿ, ಕನಿಷ್ಠ, ಗರಿಷ್ಠ ಬೆಲೆಗಳು ಮತ್ತು ಆವಕ ಪ್ರಮಾಣ",
      selectCommodity: "ಬೆಳೆ",
      selectDistrict: "ಜಿಲ್ಲೆ",
      selectMandi: "ಮಂಡಿ / ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆ",
      modalPrice: "ಮಾದರಿ ಬೆಲೆ",
      minPrice: "ಕನಿಷ್ಠ ಬೆಲೆ",
      maxPrice: "ಗರಿಷ್ಠ ಬೆಲೆ",
      arrivalsQtl: "ಆವಕ (ಕ್ವಿಂಟಾಲ್)",
      historicalTrend: "ಕಳೆದ 15 ದಿನಗಳ ಬೆಲೆ ಏರಿಳಿತ",
      dataSourceNotice: "ಅಗ್ಮಾರ್ಕ್‌ನೆಟ್ ಮತ್ತು ಕರ್ನಾಟಕ ಎಪಿಎಂಸಿ ಪೋರ್ಟಲ್‌ನಿಂದ ನೇರ ಮಾಹಿತಿ",
      lastUpdated: "ಕೊನೆಯ ಅಪ್‌ಡೇಟ್: ಇಂದು ಬೆಳಿಗ್ಗೆ 10:30",
      compareMandis: "ಮಂಡಿಗಳನ್ನು ಹೋಲಿಸಿ"
    },
    forecast: {
      title: "AI ಮಶಿನ್ ಲರ್ನಿಂಗ್ ಬೆಲೆ ಮುನ್ಸೂಚನೆ",
      subtitle: "ಮುಂದಿನ 1 ರಿಂದ 14 ದಿನಗಳ ಮಾದರಿ ಬೆಲೆ ಮತ್ತು ಆವಕ ಮುನ್ನೋಟ",
      horizon1d: "1 ದಿನದ ನಂತರ",
      horizon3d: "3 ದಿನಗಳ ನಂತರ",
      horizon7d: "7 ದಿನಗಳ ನಂತರ",
      horizon14d: "14 ದಿನಗಳ ನಂತರ",
      expectedPrice: "ನಿರೀಕ್ಷಿತ ಮಾದರಿ ಬೆಲೆ",
      confidenceInterval: "90% ನಿಖರತೆಯ ವ್ಯಾಪ್ತಿ",
      keyDrivers: "ಬೆಲೆ ಬದಲಾವಣೆಗೆ ಪ್ರಮುಖ ಕಾರಣಗಳು",
      modelAccuracy: "ಮಾದರಿಯ ನಿಖರತೆ (sMAPE 4.2% · MAE ₹94/ಕ್ವಿ)",
      backtestComparison: "ಹಿಂದಿನ ಮುನ್ಸೂಚನೆ vs ನೈಜ ಬೆಲೆ",
      disclaimer: "ಬೆಲೆ ಮುನ್ಸೂಚನೆಗಳು ಸಂಖ್ಯಾಶಾಸ್ತ್ರೀಯ ಅಂದಾಜುಗಳು, ಖಚಿತ ಗ್ಯಾರಂಟಿ ಅಲ್ಲ."
    },
    optimizer: {
      title: "ಬುದ್ಧಿವಂತ ಬಹು-ಮಂಡಿ ಹಂಚಿಕೆ ಯಂತ್ರ",
      subtitle: "ಸಾರಿಗೆ, ಹಮಾಲಿ, ಎಪಿಎಂಸಿ ಶುಲ್ಕ ಮತ್ತು ಹಾಳಾಗುವಿಕೆ ಕಳೆದು ಗರಿಷ್ಠ ನಿವ್ವಳ ಲಾಭ ನೀಡುವ ಶಿಫಾರಸು",
      inputHarvest: "ಮಾರಾಟಕ್ಕೆ ಸಿದ್ಧವಿರುವ ಕೊಯ್ಲಿನ ಪ್ರಮಾಣ (ಕ್ವಿಂಟಾಲ್)",
      harvestDate: "ಕೊಯ್ಲು ಮಾಡುವ ದಿನಾಂಕ",
      maxRadius: "ಹುಡುಕಾಟದ ವ್ಯಾಪ್ತಿ (ಕಿ.ಮೀ)",
      runOptimization: "ಗರಿಷ್ಠ ಲಾಭ ಲೆಕ್ಕಾಚಾರ ಮಾಡಿ",
      bestScenario: "ಅತ್ಯುತ್ತಮ ಆಯ್ಕೆ",
      scenarioA: "ಆಯ್ಕೆ A: ತಕ್ಷಣ ಹತ್ತಿರದ ಮಂಡಿಗೆ 100% ಮಾರಾಟ",
      scenarioB: "ಆಯ್ಕೆ B: ಬೆಲೆ ಏರಿಕೆಗಾಗಿ 4 ದಿನ ಕಾಯುವುದು",
      scenarioC: "ಆಯ್ಕೆ C: ಎರಡು ಮಂಡಿಗಳಿಗೆ ವಿಭಜಿಸಿ ಕಳುಹಿಸುವುದು",
      scenarioD: "ಆಯ್ಕೆ D: ಶೀತಲ ಗೋದಾಮಿನಲ್ಲಿ 10 ದಿನ ಇಟ್ಟು ಮಾರುವುದು",
      transportExpense: "ಸಾರಿಗೆ ಮತ್ತು ಡೀಸೆಲ್ ವೆಚ್ಚ",
      handlingExpense: "ಹಮಾಲಿ ಮತ್ತು ತೂಕ ಶುಲ್ಕ",
      apmcCess: "ಮಂಡಿ ಶುಲ್ಕ (1.5%)",
      spoilageLoss: "ಸಾಗಣೆ ಹಾಳಾಗುವಿಕೆ ನಷ್ಟ",
      netRealizedPerQtl: "ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್‌ಗೆ ಸಿಗುವ ನಿವ್ವಳ ಬೆಲೆ",
      recommendedSplit: "ಶಿಫಾರಸು ಮಾಡಿದ ಹಂಚಿಕೆ",
      aiJustification: "AI ಆರ್ಥಿಕ ವಿವರಣೆ ಮತ್ತು ಸಲಹೆ"
    },
    capacity: {
      title: "ಮಂಡಿ ಸಾಮರ್ಥ್ಯ ಮತ್ತು ದಟ್ಟಣೆ ನಿರ್ವಹಣೆ",
      subtitle: "ದೈನಂದಿನ ನಿರ್ವಹಣಾ ಮಿತಿ, ಇಂದಿನ ಆವಕ ಮತ್ತು ಎಪಿಎಂಸಿ ಗೇಟ್ ದಟ್ಟಣೆ ಸ್ಥಿತಿ",
      dailyLimit: "ದೈನಂದಿನ ಸಾಮರ್ಥ್ಯ ಮಿತಿ",
      arrivalsToday: "ಇಂದಿನ ಆವಕ",
      availableCapacity: "ಉಳಿದಿರುವ ಅನ್‌ಲೋಡ್ ಸಾಮರ್ಥ್ಯ",
      utilizationPercent: "ಸಾಮರ್ಥ್ಯ ಬಳಕೆ",
      congestionState: "ಮಾರುಕಟ್ಟೆ ಸಂಚಾರ ಸ್ಥಿತಿ",
      updateCapacityAdmin: "ಸಾಮರ್ಥ್ಯ ಅಪ್‌ಡೇಟ್ (ಆಡಳಿತ)",
      coldStorageStatus: "ಶೀತಲ ಗೋದಾಮು ಲಭ್ಯತೆ"
    },
    cropHealth: {
      title: "AI ಬೆಳೆ ಆರೋಗ್ಯ ಮತ್ತು ರೋಗ ಪತ್ತೆ",
      subtitle: "ಕ್ಯಾಮೆರಾ ಫೋಟೋ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ICAR ಅನುಮೋದಿತ ಸುರಕ್ಷಿತ ಪರಿಹಾರ ಪಡೆಯಿರಿ",
      uploadPhoto: "ಸಸ್ಯದ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      takePhoto: "ಕ್ಯಾಮೆರಾದಲ್ಲಿ ಫೋಟೋ ತೆಗೆಯಿರಿ",
      selectPart: "ಬಾಧಿತ ಭಾಗ",
      describeSymptoms: "ಕಂಡುಬಂದ ಲಕ್ಷಣಗಳು",
      diagnoseButton: "AI ರೋಗ ಪತ್ತೆ ಚಾಲನೆ ಮಾಡಿ",
      diagnosisResult: "ಪತ್ತೆಯಾದ ರೋಗದ ವಿವರ",
      confidence: "ವಿಶ್ವಾಸಾರ್ಹತೆಯ ಮಟ್ಟ",
      organicCure: "ಜೈವಿಕ ಮತ್ತು ನೈಸರ್ಗಿಕ ಪರಿಹಾರಗಳು",
      chemicalCure: "ICAR ಶಿಫಾರಸು ಮಾಡಿದ ಔಷಧಿ",
      preventiveCare: "ಮುನ್ನೆಚ್ಚರಿಕೆ ಕ್ರಮಗಳು",
      escalateExpert: "ಕೃಷಿ ವಿಜ್ಞಾನಿಗೆ ಕಳುಹಿಸಿ",
      recentDiagnoses: "ಹಿಂದಿನ ರೋಗ ಪರೀಕ್ಷೆಗಳು"
    },
    voice: {
      modalTitle: "ಮಂಡಿ AI ಧ್ವನಿ ಸಹಾಯಕ",
      listening: "ನಿಮ್ಮ ಧ್ವನಿಯನ್ನು ಆಲಿಸುತ್ತಿದೆ...",
      speakNow: "ಕನ್ನಡದಲ್ಲಿ ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ",
      trySaying: "ಹೀಗೆ ಕೇಳಿ ನೋಡಿ:",
      example1: "ನನಗೆ 30 ಕ್ವಿಂಟಾಲ್ ಟೊಮ್ಯಾಟೊಗೆ ಯಾವ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಹೆಚ್ಚು ಲಾಭ ಸಿಗುತ್ತದೆ?",
      example2: "ಯಶವಂತಪುರದಲ್ಲಿ ಈರುಳ್ಳಿ ಬೆಲೆ ಮುಂದಿನ ವಾರ ಹೆಚ್ಚಾಗುತ್ತಾ?",
      example3: "ನನ್ನ ಟೊಮ್ಯಾಟೊ ಎಲೆ ಕಪ್ಪಾಗುತ್ತಿದೆ, ಯಾವ ಔಷಧಿ ಸಿಂಪಡಿಸಬೇಕು?",
      processing: "ಮಾಹಿತಿ ಪರಿಶೀಲಿಸಿ ಲಾಭ ಲೆಕ್ಕ ಹಾಕಲಾಗುತ್ತಿದೆ...",
      audioAnswer: "ಧ್ವನಿ ಉತ್ತರ"
    },
    ai: {
      assistantTitle: "ಮಂಡಿ AI ಕೃಷಿ ಸಲಹೆಗಾರ",
      assistantSubtitle: "ನೈಜ ಎಪಿಎಂಸಿ ದರಗಳು ಮತ್ತು ಕೃಷಿ ವಿಜ್ಞಾನ ಆಧಾರಿತ ಸಲಹೆ",
      placeholder: "ಬೆಳೆ, ಮಂಡಿ, ದರ, ರೋಗ ಅಥವಾ ಹವಾಮಾನ ಬಗ್ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ...",
      send: "ಕಳುಹಿಸಿ",
      suggested1: "ನನಗೆ ಯಾವ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಹೆಚ್ಚು ಲಾಭ ಸಿಗುತ್ತದೆ?",
      suggested2: "ಈಗಲೇ ಮಾರಬೇಕಾ ಅಥವಾ 5 ದಿನ ಕಾಯಬೇಕಾ?",
      suggested3: "ಕೆಂಪು ಮರಳು ಮಣ್ಣಿಗೆ ಸೂಕ್ತವಾದ ಟೊಮ್ಯಾಟೊ ತಳಿ ಯಾವುದು?"
    }
  },
  hi: {
    appName: "मंडी AI 2.0",
    appTagline: "किसान शुद्ध मुनाफा और बहु-मंडी आवंटन अनुकूलन मंच",
    nav: {
      dashboard: "किसान डैशबोर्ड",
      marketPrices: "लाइव मंडी भाव",
      priceForecast: "AI मूल्य पूर्वानुमान",
      allocationOptimizer: "मंडी आवंटन इंजन",
      mandiCapacity: "मंडी क्षमता",
      cropHealth: "फसल रोग निदान",
      cropSelection: "फसल परामर्श",
      weather: "मौसम की जानकारी",
      interactiveMap: "कृषि मानचित्र",
      transportSharing: "साझा परिवहन",
      buyerMarket: "खरीदार बाजार",
      storage: "कोल्ड स्टोरेज",
      finance: "कृषि वित्त",
      community: "किसान समुदाय",
      schemes: "सरकारी योजनाएं",
      adminPortal: "प्रशासन और डेटा स्रोत",
      aiAssistant: "मंडी AI सहायक",
      marketAnalytics: "ग्राफ और बाजार विश्लेषण",
      digitalTwin: "फार्म डिजिटल ट्विन सिम्युलेटर",
      harvestPlanning: "कटाई एवं उपज प्रबंधन",
      expertPortal: "कृषि विशेषज्ञ पोर्टल"
    },
    common: {
      save: "सुरक्षित करें",
      cancel: "रद्द करें",
      delete: "हटाएं",
      edit: "संपादित करें",
      submit: "जमा करें",
      loading: "प्रक्रिया जारी है...",
      search: "मंडी या फसल खोजें...",
      filter: "फ़िल्टर",
      all: "सभी",
      today: "आज",
      viewDetails: "विवरण देखें",
      status: "स्थिति",
      date: "दिनांक",
      quintal: "क्विंटल (100 किग्रा)",
      kg: "किलोग्राम (किग्रा)",
      tonne: "मीट्रिक टन",
      inr: "₹",
      distance: "दूरी",
      verified: "आधिकारिक सत्यापित",
      demoData: "डेमो डेटा",
      liveSource: "एगमार्कनेट लाइव सिंक",
      switchRole: "भूमिका:",
      voiceQuery: "आवाज सहायक",
      speaking: "बोल रहा है...",
      listen: "सुनें (ऑडियो)",
      netRealization: "शुद्ध प्राप्ति",
      grossRevenue: "सकल राजस्व",
      totalCost: "कुल कटौती",
      profit: "अपेक्षित लाभ"
    },
    dashboard: {
      welcomeFarmer: "नमस्ते, नवीन कुमार",
      overviewSubtitle: "मंड्या जिला · 4.5 एकड़ · लाल बलुई दोमट मिट्टी · बोरवेल ड्रिप",
      weatherCardTitle: "मौसम और छिड़काव परामर्श",
      activeCrops: "सक्रिय फसलें",
      growthStage: "चरण: फूल और फल बनने का समय",
      expectedHarvest: "6 दिनों में कटाई तैयार",
      estimatedYield: "अनुमानित उपज: 45 क्विंटल",
      currentModalPrice: "वर्तमान मॉडल भाव",
      topMandiNotice: "सर्वोच्च शुद्ध मुनाफा देने वाली मंडी",
      priceForecastTrend: "7-दिवसीय मूल्य पूर्वानुमान",
      actions: "त्वरित निर्णय उपकरण",
      alertsTitle: "अत्यावश्यक मंडी और फसल अलर्ट",
      realizationSummary: "अनुमानित शुद्ध प्राप्ति"
    },
    market: {
      title: "लाइव कृषि मंडी मूल्य और आवक",
      subtitle: "आधिकारिक एगमार्कनेट दैनिक मॉडल, न्यूनतम, अधिकतम मूल्य और आवक मात्रा",
      selectCommodity: "फसल",
      selectDistrict: "जिला",
      selectMandi: "मंडी / एपीएमसी यार्ड",
      modalPrice: "मॉडल भाव",
      minPrice: "न्यूनतम भाव",
      maxPrice: "अधिकतम भाव",
      arrivalsQtl: "आवक (क्विंटल)",
      historicalTrend: "पिछले 15 दिनों का मूल्य रुझान",
      dataSourceNotice: "एगमार्कनेट एवं राज्य एपीएमसी पोर्टल से सीधे प्राप्त",
      lastUpdated: "अंतिम सिंक: आज सुबह 10:30 बजे",
      compareMandis: "मंडियों की तुलना करें"
    },
    forecast: {
      title: "AI मशीन लर्निंग मूल्य पूर्वानुमान",
      subtitle: "आगामी 1 से 14 दिनों के मॉडल मूल्य और आवक का सांख्यिकीय अनुमान",
      horizon1d: "1 दिन बाद",
      horizon3d: "3 दिन बाद",
      horizon7d: "7 दिन बाद",
      horizon14d: "14 दिन बाद",
      expectedPrice: "अनुमानित मॉडल भाव",
      confidenceInterval: "90% विश्वास अंतराल दायरा",
      keyDrivers: "मूल्य निर्धारण के मुख्य कारक",
      modelAccuracy: "मॉडल सटीकता (sMAPE 4.2% · MAE ₹94/क्विंटल)",
      backtestComparison: "पूर्वानुमान बनाम वास्तविक सत्यापन",
      disclaimer: "पूर्वानुमान सांख्यिकीय संभावनाओं पर आधारित हैं, कोई गारंटीकृत अनुबंध नहीं।"
    },
    optimizer: {
      title: "इंटेलिजेंट मल्टी-मंडी आवंटन अनुकूलक",
      subtitle: "परिवहन, पल्लेदारी, मंडी टैक्स और नुकसान घटाकर किसान के शुद्ध मुनाफे को अधिकतम करने वाला इंजन",
      inputHarvest: "बिक्री के लिए तैयार फसल मात्रा (क्विंटल)",
      harvestDate: "नियोजित कटाई तिथि",
      maxRadius: "दायरा खोजें (किमी)",
      runOptimization: "इष्टतम आवंटन की गणना करें",
      bestScenario: "सर्वोत्तम सिफारिश",
      scenarioA: "विकल्प A: निकटतम मंडी में तुरंत 100% बिक्री",
      scenarioB: "विकल्प B: मूल्य वृद्धि हेतु 4 दिन प्रतीक्षा करें",
      scenarioC: "विकल्प C: दो मंडियों में विभाजित कर भेजें",
      scenarioD: "विकल्प D: कोल्ड स्टोरेज में 10 दिन रखकर बेचें",
      transportExpense: "भाड़ा और डीजल खर्च",
      handlingExpense: "हमाली / पल्लेदारी और तौल शुल्क",
      apmcCess: "एपीएमसी मंडी शुल्क (1.5%)",
      spoilageLoss: "रास्ते में खराबी एवं वजन में कमी",
      netRealizedPerQtl: "प्रति क्विंटल शुद्ध प्राप्त भाव",
      recommendedSplit: "सुझाया गया आवंटन",
      aiJustification: "आर्थिक कारण और व्याख्या"
    },
    capacity: {
      title: "मंडी क्षमता एवं आवक प्रबंधन",
      subtitle: "दैनिक प्रबंधन सीमा, आज की आवक एवं गेट जाम की लाइव स्थिति",
      dailyLimit: "दैनिक क्षमता सीमा",
      arrivalsToday: "आज की आवक",
      availableCapacity: "उपलब्ध अनलोडिंग क्षमता",
      utilizationPercent: "क्षमता उपयोग प्रतिशत",
      congestionState: "यार्ड की स्थिति",
      updateCapacityAdmin: "क्षमता अद्यतन (व्यवस्थापक)",
      coldStorageStatus: "कोल्ड स्टोरेज उपलब्धता"
    },
    cropHealth: {
      title: "AI फसल स्वास्थ्य और रोग निदान",
      subtitle: "तस्वीर खींचकर तुरंत आईसीएआर प्रमाणित सुरक्षित उपचार प्राप्त करें",
      uploadPhoto: "पौधे की तस्वीर अपलोड करें",
      takePhoto: "कैमरे से फोटो लें",
      selectPart: "प्रभावित अंग",
      describeSymptoms: "दिखाई देने वाले लक्षण",
      diagnoseButton: "AI विजन पैथोलॉजी जांच करें",
      diagnosisResult: "रोग निदान परिणाम",
      confidence: "विश्वास स्तर",
      organicCure: "जैविक एवं प्राकृतिक उपचार",
      chemicalCure: "आईसीएआर अनुमोदित रासायनिक उपचार",
      preventiveCare: "रोकथाम के उपाय",
      escalateExpert: "कृषि वैज्ञानिक को भेजें",
      recentDiagnoses: "पूर्व जांच इतिहास"
    },
    voice: {
      modalTitle: "मंडी AI आवाज सहायक",
      listening: "आपकी आवाज सुन रहा है...",
      speakNow: "हिंदी में स्पष्ट रूप से बोलें",
      trySaying: "इस तरह पूछें:",
      example1: "मुझे किस मंडी में सबसे ज्यादा मुनाफा मिलेगा?",
      example2: "क्या यशवंतपुर में अगले हफ्ते प्याज का भाव बढ़ेगा?",
      example3: "टमाटर के पत्ते मुड़ रहे हैं, क्या उपाय करें?",
      processing: "जानकारी जांच कर मुनाफा निकाला जा रहा है...",
      audioAnswer: "ध्वनि उत्तर"
    },
    ai: {
      assistantTitle: "मंडी AI कृषि सलाहकार",
      assistantSubtitle: "सच्चे एपीएमसी भावों और कृषि विज्ञान पर आधारित परामर्श",
      placeholder: "फसल, मंडी भाव, रोग, मौसम या सरकारी योजना के बारे में पूछें...",
      send: "भेजें",
      suggested1: "मुझे किस मंडी में सबसे ज्यादा मुनाफा मिलेगा?",
      suggested2: "क्या मुझे अभी बेचना चाहिए या 5 दिन इंतजार करना चाहिए?",
      suggested3: "लाल बलुई मिट्टी के लिए सबसे अच्छी टमाटर किस्म कौन सी है?"
    }
  }
};
