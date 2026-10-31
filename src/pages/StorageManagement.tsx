import React, { useState } from 'react';
import { useTranslation } from '../i18n/context';
import { COLD_STORAGE_FACILITIES } from '../data/marketPrices';
import { COMMODITIES } from '../data/commodities';
import { Package, Thermometer, Droplets, AlertTriangle, CheckCircle2, TrendingUp, Calendar } from 'lucide-react';

export const StorageManagement: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCropId, setSelectedCropId] = useState('onion');
  const [holdingDays, setHoldingDays] = useState(15);
  const [storedQuantityQtl, setStoredQuantityQtl] = useState(50);
  const [currentMandiPrice, setCurrentMandiPrice] = useState(2400);

  const crop = COMMODITIES.find(c => c.id === selectedCropId) || COMMODITIES[1];

  // Storage Economics Math
  const monthlyRatePerQtl = 75; // average rental per quintal per month (~₹40/bag of 50kg)
  const totalStorageFee = Math.round((storedQuantityQtl * monthlyRatePerQtl * (holdingDays / 30)));
  
  // Deterioration shrinkage rate
  const shrinkagePercent = selectedCropId === 'tomato' ? holdingDays * 1.5 : selectedCropId === 'onion' ? holdingDays * 0.15 : holdingDays * 0.1;
  const shrinkageLossValue = Math.round((currentMandiPrice * storedQuantityQtl) * (shrinkagePercent / 100));

  const totalHoldingCost = totalStorageFee + shrinkageLossValue;
  const breakEvenPriceRequired = Math.round(currentMandiPrice + (totalHoldingCost / storedQuantityQtl));
  const breakEvenPercentage = (((breakEvenPriceRequired - currentMandiPrice) / currentMandiPrice) * 100).toFixed(1);

  const isExceedingSafeShelfLife = holdingDays > crop.shelfLifeDays;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <Package className="w-4 h-4 text-emerald-600" />
          <span>Post-Harvest Quality Preservation & Break-Even Economics</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">{t.nav.storage} & Spoilage Tracker</h1>
        <p className="text-sm text-slate-500">
          Evaluate whether storing produce in controlled-atmosphere cold units covers rental and shrinkage fees before future market price rallies.
        </p>
      </div>

      {/* Shelf Life Expiry Warning */}
      {isExceedingSafeShelfLife && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-rose-900 uppercase tracking-wider">
              Critical Warning: Planned Holding Exceeds Safe Shelf Life
            </span>
            <p className="text-xs text-rose-800 mt-0.5 leading-relaxed">
              {crop.name} has a safe commercial shelf limit of {crop.shelfLifeDays} days. Holding for {holdingDays} days will cause severe physiological decay, black mold, and complete auction rejection.
            </p>
          </div>
        </div>
      )}

      {/* Simulator Inputs & Break-Even Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Inputs Column */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Storage Parameters
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Commodity</label>
              <select
                value={selectedCropId}
                onChange={e => setSelectedCropId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {COMMODITIES.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} (Safe Limit: {c.shelfLifeDays} Days)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Holding Duration (Days):</span>
                <span className="text-emerald-700 font-bold">{holdingDays} Days</span>
              </div>
              <input
                type="range"
                min={3}
                max={90}
                step={1}
                value={holdingDays}
                onChange={e => setHoldingDays(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Quantity Stored:</span>
                <span className="text-emerald-700 font-bold">{storedQuantityQtl} Quintals</span>
              </div>
              <input
                type="range"
                min={10}
                max={200}
                step={5}
                value={storedQuantityQtl}
                onChange={e => setStoredQuantityQtl(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Current Mandi Price:</span>
                <span className="text-emerald-700 font-bold">₹{currentMandiPrice} / Qtl</span>
              </div>
              <input
                type="range"
                min={1000}
                max={5000}
                step={50}
                value={currentMandiPrice}
                onChange={e => setCurrentMandiPrice(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5">
            <div className="flex justify-between text-slate-600">
              <span>Optimal Cold Temp:</span>
              <span className="font-semibold text-slate-900">{crop.storageTempC}°C</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Standard Safe Moisture:</span>
              <span className="font-semibold text-slate-900">{crop.standardMoisturePercent}%</span>
            </div>
          </div>
        </div>

        {/* Break-Even Math Column */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Post-Storage Break-Even Hurdle
            </span>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900 font-mono">
                ₹{breakEvenPriceRequired}
              </span>
              <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
                Requires +{breakEvenPercentage}% (+₹{breakEvenPriceRequired - currentMandiPrice}) Rally
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Future auction price must exceed ₹{breakEvenPriceRequired}/qtl after {holdingDays} days to generate a positive net return over selling today.
            </p>

            {/* Deductions Breakdown */}
            <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Cold Store Rental ({holdingDays} Days):</span>
                <span className="font-mono text-slate-900">₹{totalStorageFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Weight Loss & Shrinkage ({shrinkagePercent.toFixed(1)}%):</span>
                <span className="font-mono text-slate-900">₹{shrinkageLossValue.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Cost of Holding:</span>
                <span className="font-mono text-rose-600">₹{totalHoldingCost.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1">
            <span className="font-bold text-emerald-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Mandi AI Decision Verdict:
            </span>
            <p className="text-slate-800 leading-relaxed font-medium">
              {Number(breakEvenPercentage) > 12
                ? `High holding risk. Tomato or perishable stock requires a huge price jump (+${breakEvenPercentage}%) that historically exceeds 14-day median market volatility. Selling immediately is strongly recommended.`
                : `Economically feasible. Semi-perishable ${crop.name} can comfortably absorb the ₹${totalHoldingCost.toLocaleString('en-IN')} storage cost, and price forecasts indicate upward pressure.`}
            </p>
          </div>
        </div>

      </div>

      {/* Verified Cold Storage Network in Karnataka */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Nearby Government & Private Controlled Atmosphere Cold Stores
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COLD_STORAGE_FACILITIES.map(cs => (
            <div
              key={cs.id}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3 text-xs"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{cs.name}</h3>
                  <p className="text-slate-500 text-[11px] mt-0.5">{cs.location}</p>
                </div>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                  ₹{cs.monthlyRatePerBag}/bag/mo
                </span>
              </div>

              <div className="space-y-1 text-slate-600 pt-1">
                <div><strong>Available Space:</strong> {cs.availableTonnes} / {cs.capacityTonnes} Tonnes</div>
                <div><strong>Temperature:</strong> {cs.tempRange} · RH {cs.humidity}</div>
                <div><strong>Commodities:</strong> {cs.commoditiesStored.join(', ')}</div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-slate-500 font-medium">{cs.contact}</span>
                <button
                  onClick={() => alert(`Calling cold chain operator at ${cs.contact} to check bay booking.`)}
                  className="font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
                >
                  Book Bay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
