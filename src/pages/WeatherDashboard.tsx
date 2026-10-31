import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/context';
import { fetchLiveAgriWeather, WeatherReport } from '../services/weather';
import { CloudSun, Wind, Droplets, AlertTriangle, ShieldCheck, Sun, CloudRain } from 'lucide-react';

export const WeatherDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [weather, setWeather] = useState<WeatherReport | null>(null);

  useEffect(() => {
    fetchLiveAgriWeather(12.523, 76.897).then(setWeather);
  }, []);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <CloudSun className="w-4 h-4 text-emerald-600" />
          <span>Agro-Meteorological Forecast & Spray Advisory</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">Weather & Climate Intelligence</h1>
        <p className="text-sm text-slate-500">
          7-Day precipitation, humidity, and micro-climate indicators synchronized with Open-Meteo & IMD agro-bulletins.
        </p>
      </div>

      {weather ? (
        <div className="space-y-6">

          {/* Current Weather Overview Card */}
          <div className="bg-gradient-to-r from-emerald-800 to-slate-900 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-amber-300">
                <Sun className="w-10 h-10 animate-spin-slow" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-emerald-200 font-semibold">
                  {weather.locationName}
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-black">{weather.currentTempC}°C</span>
                  <span className="text-sm text-emerald-100">{weather.currentCondition}</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-emerald-100/80">
                  <span className="flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5" /> Relative Humidity: {weather.currentHumidity}%
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind className="w-3.5 h-3.5" /> Wind Speed: {weather.currentWindKmh} km/h
                  </span>
                </div>
              </div>
            </div>

            {/* Spray Advisory Badge */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 max-w-sm space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                  Field Spray Condition Today
                </span>
              </div>
              <p className="text-xs text-white leading-relaxed font-medium">
                {weather.dailyForecast[0]?.sprayAdviceReason}
              </p>
            </div>
          </div>

          {/* Extreme Agro-Climatic Warning */}
          {weather.extremeAlert && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  Agro-Climatic Alert: {weather.extremeAlert.type.replace(/_/g, ' ')}
                </span>
                <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                  {weather.extremeAlert.message}
                </p>
              </div>
            </div>
          )}

          {/* 7-Day Forecast Grid */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              7-Day Daily Outlook & Spray Feasibility
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {weather.dailyForecast.map((df, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between text-center space-y-3"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">{df.dayName}</div>
                    <div className="text-[11px] text-slate-400">{df.date.split('-').slice(1).join('/')}</div>

                    <div className="my-3 flex items-center justify-center">
                      {df.precipitationProbability > 40 ? (
                        <CloudRain className="w-8 h-8 text-blue-500" />
                      ) : (
                        <Sun className="w-8 h-8 text-amber-500" />
                      )}
                    </div>

                    <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-slate-800">
                      <span>{df.tempMaxC}°</span>
                      <span className="text-slate-400 font-normal">/ {df.tempMinC}°</span>
                    </div>

                    <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-center gap-1">
                      <Droplets className="w-3 h-3 text-blue-500" />
                      <span>{df.precipitationProbability}% rain</span>
                    </div>
                  </div>

                  {/* Spray indicator */}
                  <div className="pt-2 border-t border-slate-100">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded block ${
                        df.sprayAdvisory === 'OPTIMAL'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : df.sprayAdvisory === 'MODERATE'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {df.sprayAdvisory === 'OPTIMAL' ? 'Good Spray' : df.sprayAdvisory === 'MODERATE' ? 'Caution' : 'No Spray'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        <div className="p-8 text-center text-slate-400 text-sm bg-white rounded-xl border border-slate-200">
          Loading live weather data...
        </div>
      )}

    </div>
  );
};
