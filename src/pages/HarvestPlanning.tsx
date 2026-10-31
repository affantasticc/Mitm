import React, { useState } from 'react';
import { useTranslation } from '../i18n/context';
import { HarvestReadinessItem } from '../types';
import {
  Calendar,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Clock,
  Award,
  CloudSun,
  Truck
} from 'lucide-react';

export const HarvestPlanning: React.FC = () => {
  const { t, language } = useTranslation();

  const [harvestItems, setHarvestItems] = useState<HarvestReadinessItem[]>([
    {
      id: 'harv-1',
      crop: 'Tomato',
      variety: 'Hybrid Shivam',
      maturityScorePercent: 88,
      colorStage: 'Pink (60%)',
      firmnessKgCm2: 4.8,
      brixSugarContent: 4.6,
      recommendedHarvestDate: '2026-11-04',
      optimalSellingWindow: 'Nov 4 - Nov 6',
      gradeAEstPercent: 65,
      gradeBEstPercent: 28,
      gradeCEstPercent: 7,
      weatherRiskDuringHarvest: 'No Risk'
    },
    {
      id: 'harv-2',
      crop: 'Ragi (Finger Millet)',
      variety: 'GPU-28',
      maturityScorePercent: 65,
      colorStage: 'Breaker (10% color)',
      firmnessKgCm2: 7.2,
      brixSugarContent: 2.1,
      recommendedHarvestDate: '2026-11-20',
      optimalSellingWindow: 'Nov 20 - Nov 25',
      gradeAEstPercent: 80,
      gradeBEstPercent: 18,
      gradeCEstPercent: 2,
      weatherRiskDuringHarvest: 'No Risk'
    }
  ]);

  const [actualHarvestQty, setActualHarvestQty] = useState(45);
  const [registeredNotice, setRegisteredNotice] = useState(false);

  const activeHarvest = harvestItems[0];

  const handleRegisterHarvest = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisteredNotice(true);
    setTimeout(() => setRegisteredNotice(false), 2000);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span>Physiological Crop Maturity & Optimal Dispatch Window Scheduler</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">Harvest & Yield Intelligence</h1>
        <p className="text-sm text-slate-500">
          Track fruit maturity stages, estimate grade distribution (Grade A/B/C), and coordinate harvest timing with predicted APMC price peaks.
        </p>
      </div>

      {registeredNotice && (
        <div className="p-3.5 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Actual harvest quantity of {actualHarvestQty} Quintals recorded! Updated in Multi-Mandi Allocator.</span>
        </div>
      )}

      {/* Harvest Readiness Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Active Crop: {activeHarvest.crop} ({activeHarvest.variety})
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">Physiological Harvest Readiness Meter</h2>
            <p className="text-xs text-slate-500">
              Assessed via optical color index and tissue penetrometer firmness reading
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 font-semibold block uppercase">Readiness Index</span>
            <span className="text-3xl font-black text-emerald-800 font-mono">
              {activeHarvest.maturityScorePercent}%
            </span>
          </div>
        </div>

        {/* Readiness Meter & Visual Stage Spectrum */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700">Maturity Progress: {activeHarvest.colorStage}</span>
            <span className="text-emerald-700">Target Harvest: {activeHarvest.recommendedHarvestDate}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              style={{ width: `${activeHarvest.maturityScorePercent}%` }}
              className="bg-emerald-600 h-3 rounded-full transition-all"
            ></div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Breaker (Green-Yellow)</span>
            <span>Turning (30%)</span>
            <span className="font-bold text-slate-700">Pink (60% - Optimal Long Haul)</span>
            <span>Light Red</span>
            <span>Full Red (Local Mandya only)</span>
          </div>
        </div>

        {/* Quality parameters grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Fruit Firmness</span>
            <span className="text-lg font-bold text-slate-900 font-mono mt-0.5">
              {activeHarvest.firmnessKgCm2} kg/cm²
            </span>
            <span className="text-[11px] text-emerald-700 block mt-0.5 font-medium">Optimal for 150km transit</span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Brix Sugar Content</span>
            <span className="text-lg font-bold text-slate-900 font-mono mt-0.5">
              {activeHarvest.brixSugarContent}° Bx
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">High natural acidity</span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Optimal Selling Window</span>
            <span className="text-lg font-bold text-emerald-800 font-mono mt-0.5">
              {activeHarvest.optimalSellingWindow}
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Coincides with APMC price peak</span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Weather Hazard</span>
            <span className="text-lg font-bold text-emerald-700 font-mono mt-0.5">
              Zero Rain Risk
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Dry harvesting conditions</span>
          </div>
        </div>

        {/* Grade Distribution Projections */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Estimated Quality Grade Distribution (Expected Harvest 45 Qtl)
          </h3>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="font-bold text-emerald-900 block">Grade A (Export / Super): 65%</span>
              <span className="text-emerald-700 text-[11px]">~29 Qtl · Suitable for Bengaluru Yeshwantpur</span>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
              <span className="font-bold text-blue-900 block">Grade B (Standard Mandi): 28%</span>
              <span className="text-blue-700 text-[11px]">~13 Qtl · Suitable for Kolar & Mandya auction</span>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
              <span className="font-bold text-amber-900 block">Grade C (Processing/Pulp): 7%</span>
              <span className="text-amber-700 text-[11px]">~3 Qtl · Direct sauce factory pickup</span>
            </div>
          </div>
        </div>

        {/* Actual Harvest Entry Form */}
        <form onSubmit={handleRegisterHarvest} className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-end gap-3">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Update Actual Picked Harvest Quantity (Quintals)
            </label>
            <input
              type="number"
              value={actualHarvestQty}
              onChange={e => setActualHarvestQty(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-xs shrink-0"
          >
            Record Actual Harvest
          </button>
        </form>

      </div>

    </div>
  );
};
