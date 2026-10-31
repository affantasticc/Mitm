import React, { useState } from 'react';
import { useTranslation } from '../i18n/context';
import { INITIAL_MANDIS } from '../data/mandis';
import { ACTIVE_ANOMALY_ALERTS } from '../data/marketPrices';
import { BENCHMARK_MODELS } from '../services/forecasting';
import {
  Settings,
  Database,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Cpu,
  Shield,
  Layers,
  Activity,
  UserCheck
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const { t, currentRole, setCurrentRole } = useTranslation();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncNotice, setSyncNotice] = useState('');

  const dataSources = [
    {
      id: 'src-1',
      name: 'AGMARKNET Direct Feed (Ministry of Agriculture)',
      status: 'Connected',
      lastSync: '2026-10-30 10:30 IST',
      latestObservationDate: '2026-10-30',
      recordsIngested: 14280,
      errorCount: 0,
      protocol: 'REST / XML Daily Ingestion'
    },
    {
      id: 'src-2',
      name: 'data.gov.in Open Government Data API',
      status: 'Connected',
      lastSync: '2026-10-30 08:00 IST',
      latestObservationDate: '2026-10-29',
      recordsIngested: 8940,
      errorCount: 1,
      protocol: 'JSON HTTPS Endpoint'
    },
    {
      id: 'src-3',
      name: 'IMD Agro-Meteorological Advisory Grid',
      status: 'Connected',
      lastSync: '2026-10-30 06:00 IST',
      latestObservationDate: '2026-10-30',
      recordsIngested: 450,
      errorCount: 0,
      protocol: 'Open-Meteo High Resolution Grid'
    },
    {
      id: 'src-4',
      name: 'Karnataka State APMC e-Kisan Unified Market',
      status: 'Connected',
      lastSync: '2026-10-30 09:45 IST',
      latestObservationDate: '2026-10-30',
      recordsIngested: 6320,
      errorCount: 0,
      protocol: 'APMC Yard Gate Webhook'
    }
  ];

  const handleManualSync = () => {
    setIsSyncing(true);
    setSyncNotice('');
    setTimeout(() => {
      setIsSyncing(false);
      setSyncNotice('All 4 external sources synchronized successfully. Ingested 184 new mandi price ticks.');
    }, 1500);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <Settings className="w-4 h-4 text-emerald-600" />
            <span>Platform Administration & Data Ingestion Control Center</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">{t.nav.adminPortal}</h1>
          <p className="text-sm text-slate-500">
            Monitor live government APIs, machine-learning pipeline metrics, anomaly detections, and gate capacity overrides.
          </p>
        </div>

        <button
          onClick={handleManualSync}
          disabled={isSyncing}
          className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors self-start md:self-auto shadow-xs cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Syncing Feeds...' : 'Trigger Immediate Pipeline Sync'}</span>
        </button>
      </div>

      {syncNotice && (
        <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{syncNotice}</span>
        </div>
      )}

      {/* Data Source Ingestion Status Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-700" />
            <span className="font-bold text-sm text-slate-800">
              Live External Data Ingestion Health
            </span>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Pipeline Health: 99.8% Uptime
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Data Source / Provider</th>
                <th className="py-3 px-4">Connection</th>
                <th className="py-3 px-4">Last Ingestion</th>
                <th className="py-3 px-4">Latest Observation</th>
                <th className="py-3 px-4 text-right">Records Ingested</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dataSources.map(ds => (
                <tr key={ds.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{ds.name}</div>
                    <span className="text-[11px] text-slate-400 font-mono">{ds.protocol}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      {ds.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-slate-600">{ds.lastSync}</td>
                  <td className="py-3 px-4 font-mono text-xs text-slate-800 font-semibold">{ds.latestObservationDate}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                    {ds.recordsIngested.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      Healthy
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid: Anomaly Events & Model Evaluation Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Anomaly Detection Log */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Active Anomaly & Market Disruption Alerts
            </h2>
            <span className="text-xs font-mono text-slate-400">Z-Score &gt; 2.0</span>
          </div>

          <div className="space-y-3">
            {ACTIVE_ANOMALY_ALERTS.map(an => (
              <div
                key={an.id}
                className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">
                    {an.commodity} · {an.mandi}
                  </span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded border text-[10px] uppercase ${
                      an.severity === 'WARNING'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-blue-50 text-blue-800 border-blue-200'
                    }`}
                  >
                    {an.category} (+{an.deviationPercent}%)
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {an.explanation.en}
                </p>
                <div className="flex justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/60">
                  <span>Detected: {an.timestamp}</span>
                  <span className="font-semibold text-slate-700">Observed: {an.observedValue} Qtl (Baseline: {an.baselineValue})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ML Model Versioning & Monitoring */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-600" />
              AI Econometric Forecasting Models
            </h2>
            <span className="text-xs font-bold text-emerald-700">LightGBM Production Active</span>
          </div>

          <div className="space-y-3">
            {BENCHMARK_MODELS.map((bm, i) => (
              <div
                key={i}
                className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{bm.modelName}</span>
                  <span className="text-emerald-800 font-mono">{bm.directionalAccuracy}% Directional Acc</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-slate-600">
                  <div className="bg-white p-2 rounded border border-slate-200">MAE: ₹{bm.mae}/qtl</div>
                  <div className="bg-white p-2 rounded border border-slate-200">RMSE: ₹{bm.rmse}/qtl</div>
                  <div className="bg-white p-2 rounded border border-slate-200">sMAPE: {bm.smape}%</div>
                </div>
                <div className="text-[10px] text-slate-400">
                  Trained: {bm.trainTimestamp} · R²: {bm.r2Score}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
