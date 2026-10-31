import React, { useState } from 'react';
import { useTranslation } from '../i18n/context';
import { generatePriceForecast, BENCHMARK_MODELS } from '../services/forecasting';
import { COMMODITIES } from '../data/commodities';
import { INITIAL_MANDIS } from '../data/mandis';
import {
  Cpu,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  BarChart3,
  CheckCircle,
  HelpCircle,
  Sliders
} from 'lucide-react';

export const PriceForecast: React.FC = () => {
  const { t, language } = useTranslation();
  const [selectedCommodity, setSelectedCommodity] = useState('tomato');
  const [selectedMandi, setSelectedMandi] = useState('mandi-yeshwantpur');
  const [activeModel, setActiveModel] = useState('LightGBM Quantile Regressor (Active)');

  const mandiObj = INITIAL_MANDIS.find(m => m.id === selectedMandi) || INITIAL_MANDIS[0];
  const commodityObj = COMMODITIES.find(c => c.id === selectedCommodity) || COMMODITIES[0];

  const currentBasePrice = selectedCommodity === 'tomato' ? 2550 : selectedCommodity === 'onion' ? 2900 : 1850;
  const forecasts = generatePriceForecast(selectedCommodity, currentBasePrice, mandiObj.name);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <Cpu className="w-4 h-4 text-emerald-600" />
          <span>Multi-Horizon Quantile Regression Pipeline (Trained on 4+ Years Agmarknet Data)</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">{t.forecast.title}</h1>
        <p className="text-sm text-slate-500">{t.forecast.subtitle}</p>
      </div>

      {/* Controls Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Commodity</label>
          <select
            value={selectedCommodity}
            onChange={e => setSelectedCommodity(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            {COMMODITIES.map(c => (
              <option key={c.id} value={c.id}>
                {language === 'kn' ? c.nameKn : language === 'hi' ? c.nameHi : c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Mandi / Market Yard</label>
          <select
            value={selectedMandi}
            onChange={e => setSelectedMandi(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            {INITIAL_MANDIS.map(m => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.district})
              </option>
            ))}
          </select>
        </div>

        <div className="ml-auto flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200 self-end">
          <span className="font-semibold text-slate-700">Today's Modal Baseline:</span>
          <span className="font-bold text-emerald-700 font-mono text-sm">₹{currentBasePrice} / Qtl</span>
        </div>
      </div>

      {/* 4 Forecast Horizon Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {forecasts.map(f => {
          const priceDiff = f.expectedPrice - currentBasePrice;
          const percentDiff = ((priceDiff / currentBasePrice) * 100).toFixed(1);

          return (
            <div
              key={f.dayHorizon}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-bold text-slate-700 uppercase tracking-wider">
                    {f.dayHorizon === 1
                      ? t.forecast.horizon1d
                      : f.dayHorizon === 3
                      ? t.forecast.horizon3d
                      : f.dayHorizon === 7
                      ? t.forecast.horizon7d
                      : t.forecast.horizon14d}
                  </span>
                  <span>{f.date}</span>
                </div>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 font-mono">
                    ₹{f.expectedPrice}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ Qtl</span>
                </div>

                {/* Trend indicator */}
                <div className="mt-2 flex items-center gap-1.5 text-xs font-bold">
                  {priceDiff > 0 ? (
                    <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <TrendingUp className="w-3.5 h-3.5" />
                      +{percentDiff}% (+₹{priceDiff})
                    </span>
                  ) : priceDiff < 0 ? (
                    <span className="flex items-center gap-1 text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      <TrendingDown className="w-3.5 h-3.5" />
                      {percentDiff}% (₹{priceDiff})
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      <Minus className="w-3.5 h-3.5" />
                      Stable
                    </span>
                  )}
                  <span className="text-slate-500 font-normal">
                    Confidence: {Math.round(f.confidenceScore * 100)}%
                  </span>
                </div>

                {/* 90% Confidence Interval */}
                <div className="mt-4 p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 text-xs space-y-1">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    90% Confidence Band:
                  </div>
                  <div className="flex items-center justify-between font-mono font-medium text-slate-700">
                    <span>Min: ₹{f.lowerConfidence90}</span>
                    <span>Max: ₹{f.upperConfidence90}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden mt-1">
                    <div className="bg-emerald-600 h-1.5 rounded-full w-[70%] mx-auto"></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
                <span>Expected Inflow:</span>
                <span className="font-semibold text-slate-700">{f.expectedArrivalsQtl} Qtl</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* SHAP Feature Importance Explainer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">{t.forecast.keyDrivers}</h2>
            <p className="text-xs text-slate-500">
              Econometric feature impact weights for {mandiObj.name} over the 7-day horizon
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {forecasts[2].keyDrivers.map((driver, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        driver.direction === 'positive' ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                    ></span>
                    {driver.feature}
                  </span>
                  <span
                    className={driver.direction === 'positive' ? 'text-emerald-700' : 'text-rose-700'}
                  >
                    {driver.direction === 'positive' ? '+' : '-'}
                    {driver.impactPercentage}% impact
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    style={{ width: `${driver.impactPercentage * 2.2}%` }}
                    className={`h-2 rounded-full ${
                      driver.direction === 'positive' ? 'bg-emerald-600' : 'bg-rose-500'
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Accuracy & Backtest Verification */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">{t.forecast.modelAccuracy}</h2>
            <p className="text-xs text-slate-500 mb-3">Model metrics validated against 90-day test split</p>

            <div className="space-y-2 text-xs">
              {BENCHMARK_MODELS.map((m, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveModel(m.modelName)}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                    activeModel === m.modelName
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span>{m.modelName}</span>
                    <span className="text-emerald-700">{m.directionalAccuracy}% Dir Acc</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-slate-500 text-[11px] font-mono">
                    <span>MAE: ₹{m.mae}/qtl</span>
                    <span>sMAPE: {m.smape}%</span>
                    <span>R²: {m.r2Score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed flex items-start gap-1.5">
            <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>{t.forecast.disclaimer}</span>
          </div>
        </div>
      </div>

    </div>
  );
};
