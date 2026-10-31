import React, { useState } from 'react';
import { useTranslation } from '../i18n/context';
import { solveMultiMandiAllocation } from '../services/optimizer';
import { COMMODITIES } from '../data/commodities';
import { INITIAL_MANDIS } from '../data/mandis';
import { CURRENT_MARKET_OBSERVATIONS } from '../data/marketPrices';
import { MandiAllocationScenario } from '../types';
import {
  Split,
  Truck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ShieldCheck,
  Scale,
  DollarSign
} from 'lucide-react';

export const AllocationOptimizer: React.FC = () => {
  const { t, language } = useTranslation();
  const [selectedCommodityId, setSelectedCommodityId] = useState('tomato');
  const [harvestQuantityQtl, setHarvestQuantityQtl] = useState(40);
  const [harvestDate, setHarvestDate] = useState('2026-10-31');
  const [maxRadiusKm, setMaxRadiusKm] = useState(150);
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);

  const commodityObj = COMMODITIES.find(c => c.id === selectedCommodityId) || COMMODITIES[0];

  // Current prices map
  const currentPricesMap: Record<string, number> = {};
  CURRENT_MARKET_OBSERVATIONS.filter(o => o.commodityId === selectedCommodityId).forEach(o => {
    currentPricesMap[o.mandiId] = o.modalPrice;
  });

  const forecastedPricesMap: Record<string, number> = {
    'mandi-yeshwantpur': (currentPricesMap['mandi-yeshwantpur'] || 2550) * 1.07,
    'mandi-kolar': (currentPricesMap['mandi-kolar'] || 2350) * 1.06,
    'mandi-mandya': (currentPricesMap['mandi-mandya'] || 1950) * 1.05,
    'mandi-mysuru': (currentPricesMap['mandi-mysuru'] || 2200) * 1.06
  };

  // Farmer coordinates (Mandya)
  const farmerLat = 12.5230;
  const farmerLng = 76.8970;

  const scenarios: MandiAllocationScenario[] = solveMultiMandiAllocation({
    commodity: commodityObj,
    quantityQtl: harvestQuantityQtl,
    farmerLat,
    farmerLng,
    mandis: INITIAL_MANDIS,
    currentModalPrices: currentPricesMap,
    forecastedPrices7d: forecastedPricesMap,
    maxDistanceKm: maxRadiusKm
  });

  const activeScenario = scenarios[selectedScenarioIndex] || scenarios[0];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <Split className="w-4 h-4 text-emerald-600" />
          <span>Mixed Integer Linear Programming (MILP) Realization Solver</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">{t.optimizer.title}</h1>
        <p className="text-sm text-slate-500">{t.optimizer.subtitle}</p>
      </div>

      {/* Input Parameters Form Card */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Scale className="w-4 h-4 text-emerald-700" />
          Harvest & Farm Logistics Parameters
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Select Crop
            </label>
            <select
              value={selectedCommodityId}
              onChange={e => setSelectedCommodityId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {COMMODITIES.map(c => (
                <option key={c.id} value={c.id}>
                  {language === 'kn' ? c.nameKn : language === 'hi' ? c.nameHi : c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              {t.optimizer.inputHarvest}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={5}
                max={500}
                value={harvestQuantityQtl}
                onChange={e => setHarvestQuantityQtl(Number(e.target.value) || 10)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <span className="text-xs font-semibold text-slate-500 shrink-0">Quintals</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              {t.optimizer.harvestDate}
            </label>
            <input
              type="date"
              value={harvestDate}
              onChange={e => setHarvestDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
              <span>{t.optimizer.maxRadius}</span>
              <span className="text-emerald-700">{maxRadiusKm} km</span>
            </div>
            <input
              type="range"
              min={30}
              max={250}
              step={10}
              value={maxRadiusKm}
              onChange={e => setMaxRadiusKm(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer mt-2"
            />
          </div>
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Evaluated Decision Scenarios (Ranked by Total Net Realization)
          </span>
          <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Capacity & Road Route Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {scenarios.map((scen, idx) => {
            const isSelected = selectedScenarioIndex === idx;
            const diffFromLowest = scen.totalNetRealization - scenarios[scenarios.length - 1].totalNetRealization;

            return (
              <div
                key={scen.scenarioId}
                onClick={() => setSelectedScenarioIndex(idx)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-600/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span
                      className={`font-bold uppercase tracking-wider text-[11px] px-2 py-0.5 rounded ${
                        scen.recommendationRank === 1
                          ? 'bg-emerald-700 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {scen.recommendationRank === 1 ? 'Optimal Choice' : `Option ${scen.recommendationRank}`}
                    </span>
                    <span className="text-slate-500 text-[11px] font-medium">
                      {scen.riskAssessment}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mt-2 line-clamp-1">{scen.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {scen.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="text-xs text-slate-500">Expected Net Realization:</div>
                  <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
                    ₹{scen.totalNetRealization.toLocaleString('en-IN')}
                  </div>
                  <div className="flex items-center justify-between text-xs text-emerald-700 font-semibold mt-1">
                    <span>₹{scen.averageNetRealizationPerQtl} / Qtl Net</span>
                    {diffFromLowest > 0 && <span>+₹{diffFromLowest.toLocaleString('en-IN')} Gain</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Scenario Breakdown Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                Rank #{activeScenario.recommendationRank} Selection
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-600 font-medium">{activeScenario.riskAssessment}</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">{activeScenario.title}</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-xs text-slate-500 block">Total Deductions (Freight + Hamali + Cess):</span>
              <span className="text-sm font-bold text-rose-600 font-mono">
                -₹{activeScenario.totalExpenses.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="text-right pl-6 border-l border-slate-200">
              <span className="text-xs text-slate-500 block">Final Net Farmer Realization:</span>
              <span className="text-2xl font-black text-emerald-800 font-mono">
                ₹{activeScenario.totalNetRealization.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Multi-Mandi Allocation Sub-Table */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            {t.optimizer.recommendedSplit}
          </h3>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Destination Mandi</th>
                  <th className="py-3 px-4">Distance</th>
                  <th className="py-3 px-4">Allocated Load</th>
                  <th className="py-3 px-4">Expected Price</th>
                  <th className="py-3 px-4">Gross Revenue</th>
                  <th className="py-3 px-4">Freight Expense</th>
                  <th className="py-3 px-4">Handling & Cess</th>
                  <th className="py-3 px-4">Quality Shrinkage</th>
                  <th className="py-3 px-4 text-emerald-800 font-bold">Net Realized</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeScenario.allocations.map((alloc, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {alloc.mandiName}
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-mono">
                      {alloc.distanceKm} km
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800">
                      {alloc.quantityQtl} Quintals
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      ₹{alloc.expectedModalPrice} / qtl
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-800">
                      ₹{alloc.grossRevenue.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 font-mono text-rose-600">
                      -₹{alloc.transportCost.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 font-mono text-rose-600">
                      -₹{(alloc.handlingCost + alloc.marketFees).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 font-mono text-amber-600">
                      -₹{alloc.spoilageLoss.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-800">
                      ₹{alloc.netRealization.toLocaleString('en-IN')}
                      <span className="block text-[11px] font-normal text-slate-500">
                        (₹{alloc.netPricePerKg}/kg)
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Economic Justification in Active Language */}
        <div className="bg-emerald-50/80 rounded-xl p-4 border border-emerald-200 space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
              {t.optimizer.aiJustification} ({language.toUpperCase()})
            </span>
          </div>
          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            {activeScenario.aiExplanation[language] || activeScenario.aiExplanation.en}
          </p>
        </div>

      </div>

    </div>
  );
};
