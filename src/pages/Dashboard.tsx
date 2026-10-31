import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/context';
import { fetchLiveAgriWeather, WeatherReport } from '../services/weather';
import { CURRENT_MARKET_OBSERVATIONS, ACTIVE_ANOMALY_ALERTS } from '../data/marketPrices';
import {
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Sprout,
  Calendar,
  CloudSun,
  ShieldCheck,
  Split,
  ScanEye,
  Cpu,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (tab: string) => void;
  onOpenVoice: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onOpenVoice }) => {
  const { t, language } = useTranslation();
  const [weather, setWeather] = useState<WeatherReport | null>(null);

  useEffect(() => {
    fetchLiveAgriWeather(12.523, 76.897).then(setWeather);
  }, []);

  const topObservation = CURRENT_MARKET_OBSERVATIONS.find(
    o => o.commodityId === 'tomato' && o.mandiId === 'mandi-yeshwantpur'
  ) || CURRENT_MARKET_OBSERVATIONS[0];

  return (
    <div className="space-y-6">

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs uppercase tracking-wider text-emerald-200 font-semibold">
              Kisan Decision Engine · Active
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{t.dashboard.welcomeFarmer}</h1>
          <p className="text-sm text-emerald-100/80 mt-1">
            {t.dashboard.overviewSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenVoice}
            className="flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-100 border border-emerald-400/30 px-3.5 py-2 rounded-xl text-xs font-semibold backdrop-blur-xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>{language === 'kn' ? 'ಧ್ವನಿ ಮೂಲಕ ಕೇಳಿ' : language === 'hi' ? 'आवाज से पूछें' : 'Ask with Voice'}</span>
          </button>
          <button
            onClick={() => onNavigate('optimizer')}
            className="flex items-center gap-2 bg-white text-emerald-900 hover:bg-emerald-50 px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm cursor-pointer"
          >
            <Split className="w-4 h-4 text-emerald-700" />
            <span>{t.nav.allocationOptimizer}</span>
          </button>
        </div>
      </div>

      {/* Urgent Alerts Banner */}
      {ACTIVE_ANOMALY_ALERTS.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                <span>{ACTIVE_ANOMALY_ALERTS[0].category.replace('_', ' ')}</span>
                <span>·</span>
                <span>{ACTIVE_ANOMALY_ALERTS[0].mandi}</span>
              </div>
              <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                {ACTIVE_ANOMALY_ALERTS[0].explanation[language] || ACTIVE_ANOMALY_ALERTS[0].explanation.en}
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('optimizer')}
            className="text-xs font-bold text-amber-900 hover:underline shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <span>See Reallocation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Core Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Active Cultivation Card */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-emerald-600" />
                {t.dashboard.activeCrops}
              </span>
              <span>2.5 Acres Block</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">Tomato (Hybrid Shivam)</h2>
            <div className="mt-2 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>{t.dashboard.growthStage}</span>
                <span className="font-semibold text-emerald-700">82 Days</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-600 h-2 rounded-full w-[85%]"></div>
              </div>
              <div className="flex items-center justify-between text-slate-500 pt-1">
                <span>{t.dashboard.expectedHarvest}</span>
                <span className="font-semibold text-slate-800">{t.dashboard.estimatedYield}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => onNavigate('health')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
            >
              <ScanEye className="w-3.5 h-3.5" />
              <span>Diagnose Leaf Health</span>
            </button>
            <span className="text-[11px] text-slate-400">Health: Good</span>
          </div>
        </div>

        {/* Live Market Price & Realization Card */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                {t.dashboard.topMandiNotice}
              </span>
              <span className="text-emerald-700 font-semibold">Agmarknet Live</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">{topObservation.mandiName}</h2>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">₹{topObservation.modalPrice}</span>
              <span className="text-xs text-slate-500 font-medium">/ Quintal (Modal)</span>
            </div>
            <div className="mt-2 text-xs text-slate-500 space-y-1">
              <div className="flex justify-between">
                <span>Net Realization after Transport:</span>
                <span className="font-bold text-emerald-700">₹2,346 / Qtl</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Net Crop Revenue:</span>
                <span className="font-bold text-slate-900">₹1,05,570 (45 Qtl)</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => onNavigate('market')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
            >
              <span>View All 12 Mandis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] text-slate-400">Synced 10:30 AM</span>
          </div>
        </div>

        {/* Weather & Spray Advisory Card */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <CloudSun className="w-4 h-4 text-amber-600" />
                {t.dashboard.weatherCardTitle}
              </span>
              <span>Mandya</span>
            </div>

            {weather ? (
              <div>
                <div className="flex items-center justify-between mt-1">
                  <div>
                    <span className="text-2xl font-black text-slate-900">{weather.currentTempC}°C</span>
                    <span className="text-xs text-slate-500 ml-2">Humidity {weather.currentHumidity}%</span>
                  </div>
                  <div className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    weather.dailyForecast[0]?.sprayAdvisory === 'OPTIMAL'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {weather.dailyForecast[0]?.sprayAdvisory === 'OPTIMAL' ? 'Optimal for Spraying' : 'Caution for Spraying'}
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                  {weather.dailyForecast[0]?.sprayAdviceReason}
                </p>
              </div>
            ) : (
              <div className="py-4 text-xs text-slate-400">Loading agro-weather forecast...</div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => onNavigate('weather')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
            >
              <span>7-Day Rain Outlook</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] text-slate-400">Wind: 11 km/h</span>
          </div>
        </div>

      </div>

      {/* Quick Action Decision Grid */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">{t.dashboard.actions}</h2>
            <p className="text-xs text-slate-500">End-to-end decisions from pre-sowing to post-harvest realization</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => onNavigate('optimizer')}
            className="bg-white hover:bg-emerald-50/70 p-4 rounded-xl border border-slate-200 text-left transition-all hover:border-emerald-300 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Split className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Multi-Mandi Allocator</h3>
            <p className="text-[11px] text-slate-500 mt-1">Optimize net profit vs freight</p>
          </button>

          <button
            onClick={() => onNavigate('forecast')}
            className="bg-white hover:bg-emerald-50/70 p-4 rounded-xl border border-slate-200 text-left transition-all hover:border-emerald-300 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Price Forecast (14d)</h3>
            <p className="text-[11px] text-slate-500 mt-1">Machine-learning price trends</p>
          </button>

          <button
            onClick={() => onNavigate('health')}
            className="bg-white hover:bg-emerald-50/70 p-4 rounded-xl border border-slate-200 text-left transition-all hover:border-emerald-300 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <ScanEye className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Crop Disease Scan</h3>
            <p className="text-[11px] text-slate-500 mt-1">AI plant vision & ICAR cure</p>
          </button>

          <button
            onClick={() => onNavigate('transport')}
            className="bg-white hover:bg-emerald-50/70 p-4 rounded-xl border border-slate-200 text-left transition-all hover:border-emerald-300 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <MapPin className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Shared Truck Logistics</h3>
            <p className="text-[11px] text-slate-500 mt-1">Split freight with farmers</p>
          </button>
        </div>
      </div>

    </div>
  );
};
