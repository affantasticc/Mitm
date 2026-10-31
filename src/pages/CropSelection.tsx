import React, { useState } from 'react';
import { useTranslation } from '../i18n/context';
import { CROP_RECOMMENDATIONS_KB } from '../data/knowledgeBase';
import { Sprout, DollarSign, Droplets, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';

export const CropSelection: React.FC = () => {
  const { t, language } = useTranslation();
  const [selectedSoil, setSelectedSoil] = useState('Red Sandy Loam');
  const [waterAccess, setWaterAccess] = useState('High (Borewell/Canal)');
  const [targetSeason, setTargetSeason] = useState('Rabi (Winter Oct-Feb)');
  const [budgetPerAcre, setBudgetPerAcre] = useState(50000);
  const [farmAcres, setFarmAcres] = useState(4.5);

  const [activeCropPlan, setActiveCropPlan] = useState(CROP_RECOMMENDATIONS_KB[0]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <Sprout className="w-4 h-4 text-emerald-600" />
          <span>Agro-Ecological Crop Suitability & Profit Maximization Model</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">Crop Advisory & Cultivation Planner</h1>
        <p className="text-sm text-slate-500">
          Simulate crop cultivation choices based on soil chemistry, irrigation capacity, seasonal market demand, and projected net returns.
        </p>
      </div>

      {/* Farm Parameters Input */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Soil Type</label>
          <select
            value={selectedSoil}
            onChange={e => setSelectedSoil(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            <option value="Red Sandy Loam">Red Sandy Loam (ಮರಳು ಮಿಶ್ರಿತ ಕೆಂಪು)</option>
            <option value="Black Clay">Black Clay (ಕಪ್ಪು ಎರೆ ಮಣ್ಣು)</option>
            <option value="Alluvial">Alluvial Soil (ಮೆಕ್ಕಲು ಮಣ್ಣು)</option>
            <option value="Laterite">Laterite Soil (ಲ್ಯಾಟರೈಟ್ ಮಣ್ಣು)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Water & Irrigation</label>
          <select
            value={waterAccess}
            onChange={e => setWaterAccess(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            <option value="High (Borewell/Canal)">High (Perennial Borewell / Drip)</option>
            <option value="Moderate (Open Well)">Moderate (Open Well / Sprinkler)</option>
            <option value="Rainfed">Rainfed (Seasonal Monsoon)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Target Season</label>
          <select
            value={targetSeason}
            onChange={e => setTargetSeason(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            <option value="Rabi (Winter Oct-Feb)">Rabi / Winter (Oct - Feb)</option>
            <option value="Kharif (Monsoon Jun-Oct)">Kharif / Monsoon (Jun - Oct)</option>
            <option value="Summer (Mar-May)">Summer / Pre-Monsoon (Mar - May)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Farm Land Holding</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step={0.5}
              min={0.5}
              max={50}
              value={farmAcres}
              onChange={e => setFarmAcres(Number(e.target.value) || 1)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <span className="text-xs font-semibold text-slate-500 shrink-0">Acres</span>
          </div>
        </div>
      </div>

      {/* Recommended Crop Cards */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          AI Ranked Crops by Net Realization Potential
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CROP_RECOMMENDATIONS_KB.map((rec, i) => {
            const isSelected = activeCropPlan.crop === rec.crop;
            const totalProjectedNetForFarm = rec.estimatedNetProfitPerAcre * farmAcres;

            return (
              <div
                key={i}
                onClick={() => setActiveCropPlan(rec)}
                className={`p-5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-600/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        i === 0 ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      Rank #{i + 1}
                    </span>
                    <span className="text-slate-500 text-[11px] font-medium">{rec.durationDays}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mt-2">{rec.crop}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                    {rec.keyAdvantage}
                  </p>

                  <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Expected Yield:</span>
                      <span className="font-bold text-slate-800">{rec.expectedYieldQtlPerAcre} Qtl/Acre</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Est. Input Cost:</span>
                      <span className="font-mono text-rose-600">₹{rec.estimatedCostPerAcre.toLocaleString('en-IN')}/Acre</span>
                    </div>
                    <div className="flex justify-between font-bold text-emerald-800 pt-1 border-t border-slate-100">
                      <span>Net Profit / Acre:</span>
                      <span className="font-mono">₹{rec.estimatedNetProfitPerAcre.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="text-[11px] text-slate-500">Projected Farm Profit ({farmAcres} Acres):</div>
                  <div className="text-lg font-black text-slate-900 font-mono">
                    ₹{Math.round(totalProjectedNetForFarm).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Cultivation Milestone Plan for Selected Crop */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Cultivation Calendar & Management Protocol
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">{activeCropPlan.crop}</h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Risk Profile: {activeCropPlan.riskRating}
          </span>
        </div>

        {/* Milestone Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <span className="text-emerald-700 font-bold uppercase block text-[10px]">Day 1 - 25: Nursery & Transplant</span>
            <p className="text-slate-700 leading-relaxed">
              Raise seedlings in pro-trays with coco-peat. Drench with Trichoderma before transplanting into 60cm raised beds.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <span className="text-emerald-700 font-bold uppercase block text-[10px]">Day 26 - 50: Vegetative & Staking</span>
            <p className="text-slate-700 leading-relaxed">
              Erect bamboo stakes and string trellising. Fertigate 19:19:19 via drip @ 3kg/acre every 4 days.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <span className="text-emerald-700 font-bold uppercase block text-[10px]">Day 51 - 80: Flowering & Fruit Set</span>
            <p className="text-slate-700 leading-relaxed">
              Foliar spray of micronutrients (Boron + Calcium Nitrate) to prevent blossom end rot. Monitor for whiteflies.
            </p>
          </div>

          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 space-y-1">
            <span className="text-emerald-800 font-bold uppercase block text-[10px]">Day 81 - 120: Harvest & Mandi Dispatch</span>
            <p className="text-emerald-900 leading-relaxed">
              Harvest at breaker/pink stage for long transit (Yeshwantpur/Kolar) or red ripe for local Mandya sales.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
