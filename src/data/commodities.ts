import { Commodity } from '../types';

export const COMMODITIES: Commodity[] = [
  {
    id: 'tomato',
    name: 'Tomato',
    nameKn: 'ಟೊಮ್ಯಾಟೊ (Tomato)',
    nameHi: 'टमाटर (Tomato)',
    category: 'Vegetables',
    varieties: ['Hybrid (Shivam/Abhinav)', 'Local Country (Nati)', 'US-440', 'Arka Rakshak'],
    shelfLifeDays: 7,
    storageTempC: 12,
    standardMoisturePercent: 88,
    defaultUnit: 'Quintal'
  },
  {
    id: 'onion',
    name: 'Onion',
    nameKn: 'ಈರುಳ್ಳಿ (Onion)',
    nameHi: 'प्याज (Onion)',
    category: 'Vegetables',
    varieties: ['Nashik Red', 'Bellary Red', 'Garlic White', 'Arka Kalyan'],
    shelfLifeDays: 45,
    storageTempC: 25,
    standardMoisturePercent: 14,
    defaultUnit: 'Quintal'
  },
  {
    id: 'potato',
    name: 'Potato',
    nameKn: 'ಆಲೂಗಡ್ಡೆ (Potato)',
    nameHi: 'आलू (Potato)',
    category: 'Vegetables',
    varieties: ['Kufri Jyoti', 'Kufri Chandramukhi', 'Hassan Local', 'Chipsona'],
    shelfLifeDays: 60,
    storageTempC: 8,
    standardMoisturePercent: 18,
    defaultUnit: 'Quintal'
  },
  {
    id: 'chilli',
    name: 'Green Chilli',
    nameKn: 'ಹಸಿ ಮೆಣಸಿನಕಾಯಿ (Green Chilli)',
    nameHi: 'हरी मिर्च (Green Chilli)',
    category: 'Spices',
    varieties: ['Guntur Sannam', 'Byadgi Dabbi', 'Jwala', 'Kashi Anmol'],
    shelfLifeDays: 10,
    storageTempC: 10,
    standardMoisturePercent: 75,
    defaultUnit: 'Quintal'
  },
  {
    id: 'paddy',
    name: 'Paddy (Dhan)',
    nameKn: 'ಭತ್ತ / ಅಕ್ಕಿ (Paddy)',
    nameHi: 'धान / चावल (Paddy)',
    category: 'Grains',
    varieties: ['Sona Masoori', 'IR-64', 'Basmati Pusa-1121', 'Jaya', 'Rajamudi'],
    shelfLifeDays: 365,
    storageTempC: 22,
    standardMoisturePercent: 13,
    defaultUnit: 'Quintal'
  },
  {
    id: 'maize',
    name: 'Maize (Corn)',
    nameKn: 'ಮೆಕ್ಕೆಜೋಳ (Maize)',
    nameHi: 'मक्का (Maize)',
    category: 'Grains',
    varieties: ['Yellow Hybrid (Pioneer)', 'Kargil 900M', 'African Tall', 'Ganga-11'],
    shelfLifeDays: 240,
    storageTempC: 20,
    standardMoisturePercent: 12,
    defaultUnit: 'Quintal'
  },
  {
    id: 'ragi',
    name: 'Ragi (Finger Millet)',
    nameKn: 'ರಾಗಿ (Finger Millet)',
    nameHi: 'रागी (मंडुआ)',
    category: 'Grains',
    varieties: ['GPU-28', 'ML-365', 'KMR-301', 'Indaf-8'],
    shelfLifeDays: 400,
    storageTempC: 22,
    standardMoisturePercent: 11,
    defaultUnit: 'Quintal'
  },
  {
    id: 'cotton',
    name: 'Cotton (Kapas)',
    nameKn: 'ಹತ್ತಿ (Cotton)',
    nameHi: 'कपास (Cotton)',
    category: 'Commercial',
    varieties: ['Bt Cotton Hybrid (Bollgard II)', 'DCH-32', 'Surabhi'],
    shelfLifeDays: 300,
    storageTempC: 24,
    standardMoisturePercent: 8,
    defaultUnit: 'Quintal'
  }
];
