import React, { useState } from 'react';
import { useTranslation } from '../i18n/context';
import { CURRENT_MARKET_OBSERVATIONS, HISTORICAL_TOMATO_PRICES } from '../data/marketPrices';
import { COMMODITIES } from '../data/commodities';
import { INITIAL_MANDIS } from '../data/mandis';
import { MarketObservation } from '../types';
import {
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  ArrowUpDown,
  Sparkles,
  Database,
  Calendar,
  Layers
} from 'lucide-react';

export const MarketIntelligence: React.FC = () => {
  const { t, language } = useTranslation();
  const [selectedCommodity, setSelectedCommodity] = useState('tomato');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [unitMode, setUnitMode] = useState<'Quintal' | 'Kg' | 'Tonne'>('Quintal');
  const [searchQuery, setSearchQuery] = useState('');

  // Conversion multiplier relative to Quintal (1 Quintal = 100 kg, 1 Tonne = 10 Quintals = 1000 kg)
  const getConvertedPrice = (pricePerQtl: number): string => {
    if (unitMode === 'Kg') {
      return (pricePerQtl / 100).toFixed(2);
    }
    if (unitMode === 'Tonne') {
      return (pricePerQtl * 10).toLocaleString('en-IN');
    }
    return pricePerQtl.toLocaleString('en-IN');
  };

  const getUnitSuffix = (): string => {
    if (unitMode === 'Kg') return '/ kg';
    if (unitMode === 'Tonne') return '/ tonne';
    return '/ quintal';
  };

  const filteredObservations = CURRENT_MARKET_OBSERVATIONS.filter(obs => {
    const matchesCommodity = obs.commodityId === selectedCommodity;
    const matchesDistrict = selectedDistrict === 'All' || obs.district.toLowerCase() === selectedDistrict.toLowerCase();
    const matchesSearch = !searchQuery || obs.mandiName.toLowerCase().includes(searchQuery.toLowerCase()) || obs.variety.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCommodity && matchesDistrict && matchesSearch;
  });

  const districts = ['All', 'Bengaluru Urban', 'Kolar', 'Mandya', 'Mysuru', 'Chikkaballapur', 'Dharwad', 'Hassan'];

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{t.market.dataSourceNotice}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">{t.market.title}</h1>
          <p className="text-sm text-slate-500">{t.market.subtitle}</p>
        </div>

        {/* Unit Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-xl self-start md:self-auto">
          <span className="text-xs font-semibold text-slate-500 px-2">Display Unit:</span>
          {(['Quintal', 'Kg', 'Tonne'] as const).map(u => (
            <button
              key={u}
              onClick={() => setUnitMode(u)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                unitMode === u
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {u === 'Quintal' ? '₹ / Quintal' : u === 'Kg' ? '₹ / Kg' : '₹ / Tonne'}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Commodity select */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            {t.market.selectCommodity}
          </label>
          <select
            value={selectedCommodity}
            onChange={e => setSelectedCommodity(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            {COMMODITIES.map(c => (
              <option key={c.id} value={c.id}>
                {language === 'kn' ? c.nameKn : language === 'hi' ? c.nameHi : c.name}
              </option>
            ))}
          </select>
        </div>

        {/* District select */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            {t.market.selectDistrict}
          </label>
          <select
            value={selectedDistrict}
            onChange={e => setSelectedDistrict(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            {districts.map(d => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Search Mandi or Variety
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="e.g. Yeshwantpur, Shivam..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
        </div>
      </div>

      {/* Table of Mandi Observations */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <span className="font-bold text-sm text-slate-800">
              Live Mandi Price Board ({filteredObservations.length} Mandis Reporting)
            </span>
          </div>
          <span className="text-xs text-slate-500">
            {t.market.lastUpdated}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Mandi / APMC Yard</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Variety</th>
                <th className="py-3 px-4">Min Price</th>
                <th className="py-3 px-4">Max Price</th>
                <th className="py-3 px-4 text-emerald-800">Modal Price</th>
                <th className="py-3 px-4 text-right">Arrivals (Qtl)</th>
                <th className="py-3 px-4 text-center">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredObservations.map(obs => (
                <tr key={obs.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {obs.mandiName}
                  </td>
                  <td className="py-3 px-4 text-slate-600">{obs.district}</td>
                  <td className="py-3 px-4 text-slate-600">{obs.variety}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono">
                    ₹{getConvertedPrice(obs.minPrice)}
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono">
                    ₹{getConvertedPrice(obs.maxPrice)}
                  </td>
                  <td className="py-3 px-4 font-bold text-emerald-800 font-mono">
                    ₹{getConvertedPrice(obs.modalPrice)} <span className="text-xs font-normal text-slate-500">{getUnitSuffix()}</span>
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-slate-700">
                    {obs.arrivals.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {obs.source}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredObservations.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 text-sm">
                    No mandi observations match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 15-Day Historical Trend Chart Card */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900">{t.market.historicalTrend} (Tomato)</h2>
            <p className="text-xs text-slate-500">Tracking daily price momentum across Yeshwantpur, Kolar, and Mandya</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-blue-700">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Yeshwantpur
            </span>
            <span className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Kolar APMC
            </span>
            <span className="flex items-center gap-1.5 text-amber-700">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span> Mandya APMC
            </span>
          </div>
        </div>

        {/* Visual Bar / Sparkline Comparison */}
        <div className="grid grid-cols-5 sm:grid-cols-15 gap-1.5 pt-4 items-end h-48 border-b border-slate-200 pb-2">
          {HISTORICAL_TOMATO_PRICES.map((item, idx) => {
            const heightPercent = Math.round(((item.yeshwantpur - 1500) / (2800 - 1500)) * 100);
            return (
              <div key={idx} className="flex flex-col items-center gap-1 h-full justify-end group relative">
                {/* Tooltip on hover */}
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-slate-900 text-white text-[10px] p-2 rounded shadow-lg z-20 whitespace-nowrap">
                  <div className="font-bold">{item.date}</div>
                  <div>Yeshwantpur: ₹{item.yeshwantpur}</div>
                  <div>Kolar: ₹{item.kolar}</div>
                  <div>Mandya: ₹{item.mandya}</div>
                  <div>Arrivals: {item.arrivals} Qtl</div>
                </div>

                <div className="w-full flex items-end justify-center gap-0.5 h-36">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-2 bg-blue-600 rounded-t-xs"
                    title={`Yeshwantpur: ₹${item.yeshwantpur}`}
                  ></div>
                  <div
                    style={{ height: `${Math.round(((item.kolar - 1500) / (2800 - 1500)) * 100)}%` }}
                    className="w-2 bg-emerald-600 rounded-t-xs"
                    title={`Kolar: ₹${item.kolar}`}
                  ></div>
                  <div
                    style={{ height: `${Math.round(((item.mandya - 1500) / (2800 - 1500)) * 100)}%` }}
                    className="w-2 bg-amber-500 rounded-t-xs"
                    title={`Mandya: ₹${item.mandya}`}
                  ></div>
                </div>
                <span className="text-[10px] text-slate-500 truncate">{item.date}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
