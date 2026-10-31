import React, { useState } from 'react';
import { useTranslation } from '../i18n/context';
import { Calculator, DollarSign, Truck, Scale, Percent, ArrowRight } from 'lucide-react';

export const NetRealizationCalc: React.FC = () => {
  const { t } = useTranslation();

  const [quantityQtl, setQuantityQtl] = useState(30);
  const [sellingPricePerQtl, setSellingPricePerQtl] = useState(2500);
  const [distanceKm, setDistanceKm] = useState(65);
  const [freightRatePerQtlPerKm, setFreightRatePerQtlPerKm] = useState(1.6);
  const [baseFreightCharge, setBaseFreightCharge] = useState(400);
  const [unloadingPerQtl, setUnloadingPerQtl] = useState(20);
  const [apmcFeePercent, setApmcFeePercent] = useState(1.5);
  const [cratesPackagingCostPerQtl, setCratesPackagingCostPerQtl] = useState(15);
  const [spoilagePercent, setSpoilagePercent] = useState(2.0);

  // Calculations
  const grossRevenue = quantityQtl * sellingPricePerQtl;
  const transportExpense = Math.round(baseFreightCharge + (quantityQtl * distanceKm * (freightRatePerQtlPerKm / 10)));
  const handlingExpense = Math.round(quantityQtl * unloadingPerQtl);
  const marketFeeExpense = Math.round(grossRevenue * (apmcFeePercent / 100));
  const packagingExpense = Math.round(quantityQtl * cratesPackagingCostPerQtl);
  const spoilageLoss = Math.round(grossRevenue * (spoilagePercent / 100));

  const totalDeductions = transportExpense + handlingExpense + marketFeeExpense + packagingExpense + spoilageLoss;
  const netRealization = grossRevenue - totalDeductions;

  const netRealizedPerQtl = Math.round(netRealization / quantityQtl);
  const netRealizedPerKg = (netRealization / (quantityQtl * 100)).toFixed(2);
  const deductionRatio = ((totalDeductions / grossRevenue) * 100).toFixed(1);

  return (
    <div className="space-y-6">

      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <Calculator className="w-4 h-4 text-emerald-600" />
          <span>Interactive Farmer Profit & Deductions Simulator</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">Net Realization Profit Calculator</h1>
        <p className="text-sm text-slate-500">
          Transparently calculate exact farmgate earnings after transportation, hamali, APMC market cess, and transit weight shrinkage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Input Sliders & Controls */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
            <span>Market & Cost Assumptions</span>
            <span className="text-xs font-normal text-slate-500">Real-time simulation</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Quantity */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Produce Quantity Ready:</span>
                <span className="text-emerald-700 font-bold">{quantityQtl} Quintals</span>
              </div>
              <input
                type="range"
                min={5}
                max={200}
                step={5}
                value={quantityQtl}
                onChange={e => setQuantityQtl(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Selling Price */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Auction Modal Price:</span>
                <span className="text-emerald-700 font-bold">₹{sellingPricePerQtl} / Qtl</span>
              </div>
              <input
                type="range"
                min={1000}
                max={6000}
                step={50}
                value={sellingPricePerQtl}
                onChange={e => setSellingPricePerQtl(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Transit Distance */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>One-Way Transit Distance:</span>
                <span className="text-emerald-700 font-bold">{distanceKm} km</span>
              </div>
              <input
                type="range"
                min={10}
                max={250}
                step={5}
                value={distanceKm}
                onChange={e => setDistanceKm(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Unloading / Hamali */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Hamali & Unloading:</span>
                <span className="text-emerald-700 font-bold">₹{unloadingPerQtl} / Qtl</span>
              </div>
              <input
                type="range"
                min={10}
                max={40}
                step={1}
                value={unloadingPerQtl}
                onChange={e => setUnloadingPerQtl(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* APMC Cess */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>APMC Market Cess:</span>
                <span className="text-emerald-700 font-bold">{apmcFeePercent}%</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={3.0}
                step={0.1}
                value={apmcFeePercent}
                onChange={e => setApmcFeePercent(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Spoilage Loss */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Transit Spoilage & Shrinkage:</span>
                <span className="text-emerald-700 font-bold">{spoilagePercent}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={8}
                step={0.5}
                value={spoilagePercent}
                onChange={e => setSpoilagePercent(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Formula Transparency Box */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 font-mono space-y-1">
            <div className="font-bold text-slate-800 font-sans mb-1 text-[11px] uppercase tracking-wider">
              Transparent Calculation Formula:
            </div>
            <div>Gross Revenue = {quantityQtl} Qtl × ₹{sellingPricePerQtl} = ₹{grossRevenue.toLocaleString('en-IN')}</div>
            <div>Net Realization = Gross Revenue (₹{grossRevenue.toLocaleString('en-IN')}) - Deductions (₹{totalDeductions.toLocaleString('en-IN')})</div>
            <div className="text-emerald-800 font-bold font-sans pt-1">
              = ₹{netRealization.toLocaleString('en-IN')} (₹{netRealizedPerQtl}/Qtl or ₹{netRealizedPerKg}/kg)
            </div>
          </div>
        </div>

        {/* Realization Waterfall & Result */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Net Farmer Realization
            </span>
            <div className="text-3xl font-black text-emerald-800 font-mono mt-1">
              ₹{netRealization.toLocaleString('en-IN')}
            </div>
            <div className="mt-1 flex items-center justify-between text-xs font-semibold text-slate-600">
              <span>₹{netRealizedPerQtl} / Quintal</span>
              <span>₹{netRealizedPerKg} / kg</span>
            </div>

            {/* Deductions breakdown list */}
            <div className="mt-6 space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 font-semibold text-slate-900">
                <span>Gross Auction Revenue</span>
                <span className="font-mono text-slate-900">₹{grossRevenue.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-rose-600">
                <span>1. Freight & Diesel ({distanceKm} km)</span>
                <span className="font-mono">-₹{transportExpense.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-rose-600">
                <span>2. Hamali & Unloading</span>
                <span className="font-mono">-₹{handlingExpense.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-rose-600">
                <span>3. APMC Cess ({apmcFeePercent}%)</span>
                <span className="font-mono">-₹{marketFeeExpense.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-rose-600">
                <span>4. Crates & Packaging</span>
                <span className="font-mono">-₹{packagingExpense.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-amber-600">
                <span>5. Transit Spoilage ({spoilagePercent}%)</span>
                <span className="font-mono">-₹{spoilageLoss.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between py-1.5 border-t border-slate-200 font-bold text-slate-800">
                <span>Total Deductions ({deductionRatio}%)</span>
                <span className="font-mono text-rose-600">-₹{totalDeductions.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 space-y-1">
            <span className="font-bold">Realization Efficiency:</span>
            <p className="text-[11px] leading-relaxed">
              You retain <strong>{(100 - Number(deductionRatio)).toFixed(1)}%</strong> of gross auction value after all deductions.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
