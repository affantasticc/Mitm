import { FarmerProfile, FinancialRecord, CropDiseaseDiagnosis, CommunityPost, Mandi } from '../types';
import { INITIAL_MANDIS } from '../data/mandis';
import { ACTIVE_PRODUCE_LISTINGS, SHARED_TRANSPORT_TRIPS } from '../data/marketPrices';

const PROFILE_KEY = 'mandi_ai_farmer_profile';
const FINANCES_KEY = 'mandi_ai_financials';
const DIAGNOSES_KEY = 'mandi_ai_diagnoses';
const POSTS_KEY = 'mandi_ai_posts';
const MANDIS_KEY = 'mandi_ai_mandis';

export const DEFAULT_FARMER_PROFILE: FarmerProfile = {
  id: 'farmer-naveen-01',
  name: 'Naveen Kumar',
  phone: '+91 98860 12345',
  language: 'kn',
  state: 'Karnataka',
  district: 'Mandya',
  village: 'Keragodu / Shivalli',
  latitude: 12.5230,
  longitude: 76.8970,
  farmSizeAcres: 4.5,
  soilType: 'Red Sandy Loam',
  waterAvailability: 'High (Borewell/Canal)',
  irrigationMethod: 'Drip',
  cropsCultivated: ['Tomato', 'Paddy', 'Ragi'],
  preferredMandis: ['mandi-mandya', 'mandi-yeshwantpur', 'mandi-mysuru', 'mandi-kolar']
};

export const INITIAL_FINANCIALS: FinancialRecord[] = [
  {
    id: 'fin-1',
    crop: 'Tomato (Hybrid Shivam)',
    season: 'Kharif 2026',
    category: 'Seeds',
    amount: 8500,
    type: 'Expense',
    date: '2026-08-10',
    notes: '20,000 hybrid seedlings from certified nursery'
  },
  {
    id: 'fin-2',
    crop: 'Tomato (Hybrid Shivam)',
    season: 'Kharif 2026',
    category: 'Fertilizer',
    amount: 14200,
    type: 'Expense',
    date: '2026-08-25',
    notes: '19:19:19 soluble fertilizer + Calcium Nitrate'
  },
  {
    id: 'fin-3',
    crop: 'Tomato (Hybrid Shivam)',
    season: 'Kharif 2026',
    category: 'Labour',
    amount: 18000,
    type: 'Expense',
    date: '2026-09-15',
    notes: 'Staking, bamboo tying, and 2 manual weedings'
  },
  {
    id: 'fin-4',
    crop: 'Tomato (Hybrid Shivam)',
    season: 'Kharif 2026',
    category: 'Irrigation',
    amount: 3500,
    type: 'Expense',
    date: '2026-09-30',
    notes: 'Drip lateral maintenance & filter cleaning'
  },
  {
    id: 'fin-5',
    crop: 'Tomato (Hybrid Shivam)',
    season: 'Kharif 2026',
    category: 'Sales Revenue',
    amount: 72000,
    type: 'Revenue',
    date: '2026-10-24',
    notes: 'First picking: 30 quintals sold at Yeshwantpur APMC'
  }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    authorName: 'Chennappa Gowda',
    authorRole: 'Progressive Farmer · Kolar',
    district: 'Kolar',
    originalLanguage: 'kn',
    content: {
      kn: 'ಇಂದು ಕೋಲಾರ ಮಂಡಿಯಲ್ಲಿ ಶಿವಂ ತಳಿಯ ಟೊಮ್ಯಾಟೊ ಉತ್ತಮ ದರ್ಜೆಯದ್ದು 15 ಕೆಜಿ ಬಾಕ್ಸ್‌ಗೆ ₹420 ರವರೆಗೆ ಮಾರಾಟವಾಯಿತು. ಮಳೆ ಇಲ್ಲದ ಕಾರಣ ನಾಳೆಯೂ ಇದೇ ದರ ಮುಂದುವರಿಯುವ ನಿರೀಕ್ಷೆಯಿದೆ.',
      hi: 'आज कोलार मंडी में शिवम हाइब्रिड टमाटर 15 किग्रा बॉक्स ₹420 तक बिका। बारिश न होने से कल भी यही भाव रहने की उम्मीद है।',
      en: 'Today in Kolar APMC, Grade-A Shivam hybrid tomato sold up to ₹420 per 15kg box. With dry weather, prices are expected to hold firm tomorrow.'
    },
    cropTag: 'Tomato',
    likes: 24,
    repliesCount: 6,
    timestamp: '2 hours ago',
    isExpertAnswered: true,
    replies: [
      {
        id: 'rep-1',
        authorName: 'Dr. Ramesh K. (KVK Agronomist)',
        isExpert: true,
        text: 'ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಕಾಯಿಗಳನ್ನು ಮುಂಜಾನೆ 8 ಗಂಟೆಯೊಳಗೆ ಕೊಯ್ದು ಕ್ರೇಟ್‌ಗಳಲ್ಲಿ ತುಂಬಿದರೆ ಹರಾಜಿನಲ್ಲಿ ₹20-30 ಹೆಚ್ಚು ಬೆಲೆ ಸಿಗುತ್ತದೆ.',
        timestamp: '1 hour ago'
      }
    ]
  },
  {
    id: 'post-2',
    authorName: 'Venkatesh Murthy',
    authorRole: 'Farmer · Mandya',
    district: 'Mandya',
    originalLanguage: 'kn',
    content: {
      kn: 'ಮಂಡ್ಯದಿಂದ ಯಶವಂತಪುರ ಮಂಡಿಗೆ ನಾಳೆ ರಾತ್ರಿ 2 ಗಂಟೆಗೆ ಐಷರ್ ಲಾರಿ ಹೋಗುತ್ತಿದೆ. 15 ಕ್ವಿಂಟಾಲ್ ಜಾಗ ಖಾಲಿಯಿದೆ. ಜಂಟಿ ಸಾರಿಗೆ ಬೇಕಾದವರು ಸಂಪರ್ಕಿಸಿ.',
      hi: 'मंड्या से यशवंतपुर मंडी के लिए कल रात 2 बजे आइशर ट्रक जा रहा है। 15 क्विंटल जगह खाली है। साझा परिवहन हेतु संपर्क करें।',
      en: 'An Eicher truck is departing from Mandya to Yeshwantpur APMC tomorrow night at 2:00 AM. 15 quintals capacity available for freight sharing.'
    },
    cropTag: 'Logistics',
    likes: 19,
    repliesCount: 3,
    timestamp: '4 hours ago',
    isExpertAnswered: false
  }
];

export function getStoredProfile(): FarmerProfile {
  if (typeof window === 'undefined') return DEFAULT_FARMER_PROFILE;
  const saved = localStorage.getItem(PROFILE_KEY);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { /* ignore */ }
  }
  return DEFAULT_FARMER_PROFILE;
}

export function saveProfile(profile: FarmerProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function getStoredFinancials(): FinancialRecord[] {
  if (typeof window === 'undefined') return INITIAL_FINANCIALS;
  const saved = localStorage.getItem(FINANCES_KEY);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { /* ignore */ }
  }
  return INITIAL_FINANCIALS;
}

export function saveFinancialRecord(record: FinancialRecord): void {
  const current = getStoredFinancials();
  const updated = [record, ...current];
  localStorage.setItem(FINANCES_KEY, JSON.stringify(updated));
}

export function getStoredDiagnoses(): CropDiseaseDiagnosis[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(DIAGNOSES_KEY);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { /* ignore */ }
  }
  return [];
}

export function saveDiagnosis(diag: CropDiseaseDiagnosis): void {
  const current = getStoredDiagnoses();
  const updated = [diag, ...current];
  localStorage.setItem(DIAGNOSES_KEY, JSON.stringify(updated));
}

export function getStoredMandis(): Mandi[] {
  if (typeof window === 'undefined') return INITIAL_MANDIS;
  const saved = localStorage.getItem(MANDIS_KEY);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { /* ignore */ }
  }
  return INITIAL_MANDIS;
}

export function updateMandiAdmin(mandiId: string, updates: Partial<Mandi>): Mandi[] {
  const mandis = getStoredMandis();
  const updated = mandis.map(m => m.id === mandiId ? { ...m, ...updates, lastUpdated: new Date().toLocaleString() } : m);
  localStorage.setItem(MANDIS_KEY, JSON.stringify(updated));
  return updated;
}
