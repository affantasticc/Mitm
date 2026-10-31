import React, { useState } from 'react';
import { useTranslation } from '../i18n/context';
import { getStoredProfile, saveProfile } from '../services/storage';
import { FarmerProfile, Language } from '../types';
import { User, Phone, MapPin, Sprout, Droplets, CheckCircle2 } from 'lucide-react';

interface FarmerOnboardingProps {
  onSaved: () => void;
}

export const FarmerOnboarding: React.FC<FarmerOnboardingProps> = ({ onSaved }) => {
  const { language, setLanguage, t } = useTranslation();
  const [profile, setProfile] = useState<FarmerProfile>(getStoredProfile);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile(profile);
    setLanguage(profile.language);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onSaved();
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <User className="w-4 h-4 text-emerald-600" />
          <span>Personalized Farm Agro-Profile & Preferences</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">Farmer Profile & Field Setup</h1>
        <p className="text-sm text-slate-500">
          Tailors price forecasting, mandi route distances, and soil crop advisories to your specific location and farm capacity.
        </p>
      </div>

      {savedNotice && (
        <div className="p-3.5 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile preferences saved! Recalculating farmer realization models...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        
        {/* Personal Details */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Farmer Identity & Language
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={profile.name}
                onChange={e => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number (OTP/SMS)</label>
              <input
                type="tel"
                required
                value={profile.phone}
                onChange={e => setProfile({ ...profile, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Language</label>
              <select
                value={profile.language}
                onChange={e => setProfile({ ...profile, language: e.target.value as Language })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="en">English</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
                <option value="hi">हिंदी (Hindi)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location Geography */}
        <div className="space-y-4 pt-2">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Location & Geographic Coordinates
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
              <select
                value={profile.state}
                onChange={e => setProfile({ ...profile, state: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">District</label>
              <input
                type="text"
                required
                value={profile.district}
                onChange={e => setProfile({ ...profile, district: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Village / Hobli</label>
              <input
                type="text"
                required
                value={profile.village}
                onChange={e => setProfile({ ...profile, village: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Agronomy Parameters */}
        <div className="space-y-4 pt-2">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Land, Soil & Water Infrastructure
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Farm Land Size</label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  step={0.5}
                  value={profile.farmSizeAcres}
                  onChange={e => setProfile({ ...profile, farmSizeAcres: Number(e.target.value) || 1 })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold"
                />
                <span className="text-xs text-slate-500">Acres</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Soil Type</label>
              <select
                value={profile.soilType}
                onChange={e => setProfile({ ...profile, soilType: e.target.value as FarmerProfile['soilType'] })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-medium"
              >
                <option value="Red Sandy Loam">Red Sandy Loam</option>
                <option value="Black Clay">Black Clay</option>
                <option value="Alluvial">Alluvial</option>
                <option value="Laterite">Laterite</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Water Source</label>
              <select
                value={profile.waterAvailability}
                onChange={e => setProfile({ ...profile, waterAvailability: e.target.value as FarmerProfile['waterAvailability'] })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-medium"
              >
                <option value="High (Borewell/Canal)">High (Borewell/Canal)</option>
                <option value="Moderate (Open Well)">Moderate (Open Well)</option>
                <option value="Rainfed">Rainfed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Irrigation Method</label>
              <select
                value={profile.irrigationMethod}
                onChange={e => setProfile({ ...profile, irrigationMethod: e.target.value as FarmerProfile['irrigationMethod'] })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-medium"
              >
                <option value="Drip">Drip Irrigation</option>
                <option value="Sprinkler">Sprinkler</option>
                <option value="Flood">Flood / Furrow</option>
                <option value="Rainfed">Rainfed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm transition-colors shadow-xs cursor-pointer"
          >
            Save Farm Profile
          </button>
        </div>

      </form>

    </div>
  );
};
