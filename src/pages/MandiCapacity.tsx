import React, { useState } from 'react';
import { useTranslation } from '../i18n/context';
import { getStoredMandis, updateMandiAdmin } from '../services/storage';
import { Mandi, CommodityCapacityBreakdown, FutureCongestionPrediction } from '../types';
import {
  Warehouse,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Layers,
  Thermometer,
  Shield,
  Edit3,
  X,
  Truck,
  Building2,
  TrendingUp,
  ArrowRight,
  Info
} from 'lucide-react';

export const MandiCapacity: React.FC = () => {
  const { t, currentRole } = useTranslation();
  const [mandis, setMandis] = useState<Mandi[]>(getStoredMandis);
  const [selectedMandiId, setSelectedMandiId] = useState<string>('mandi-yeshwantpur');
  const [editingMandi, setEditingMandi] = useState<Mandi | null>(null);

  // Edit form state
  const [editArrivals, setEditArrivals] = useState<number>(0);
  const [editCapacity, setEditCapacity] = useState<number>(0);
  const [editStatus, setEditStatus] = useState<Mandi['congestionStatus']>('Free');

  const selectedMandi = mandis.find(m => m.id === selectedMandiId) || mandis[0];

  // Commodity-wise capacity breakdown for selected mandi
  const commodityBreakdown: CommodityCapacityBreakdown[] = [
    {
      commodity: 'Tomato',
      allocatedBays: 14,
      totalBays: 18,
      currentArrivalsTonnes: 740,
      maxCapacityTonnes: 900,
      status: 'Near Full'
    },
    {
      commodity: 'Onion & Garlic',
      allocatedBays: 22,
      totalBays: 24,
      currentArrivalsTonnes: 1100,
      maxCapacityTonnes: 1200,
      status: 'Near Full'
    },
    {
      commodity: 'Potato',
      allocatedBays: 10,
      totalBays: 16,
      currentArrivalsTonnes: 480,
      maxCapacityTonnes: 750,
      status: 'Normal'
    },
    {
      commodity: 'Food Grains (Paddy/Maize)',
      allocatedBays: 8,
      totalBays: 12,
      currentArrivalsTonnes: 320,
      maxCapacityTonnes: 600,
      status: 'Normal'
    }
  ];

  // Future congestion predictions for the next 72 hours
  const futureCongestion: FutureCongestionPrediction[] = [
    {
      timeHorizon: 'Today Evening',
      predictedArrivalsTonnes: selectedMandi.currentArrivalsTonnes + 250,
      congestionProbability: 72,
      riskLevel: 'Moderate',
      recommendedArrivalWindow: '04:00 AM - 06:30 AM Tomorrow'
    },
    {
      timeHorizon: 'Tomorrow Morning',
      predictedArrivalsTonnes: selectedMandi.dailyCapacityTonnes * 0.94,
      congestionProbability: 88,
      riskLevel: 'Severe',
      recommendedArrivalWindow: 'Divert 40% to Mysuru or Kolar'
    },
    {
      timeHorizon: 'In 48 Hours',
      predictedArrivalsTonnes: selectedMandi.dailyCapacityTonnes * 0.75,
      congestionProbability: 45,
      riskLevel: 'Low',
      recommendedArrivalWindow: 'Optimal Discharging Window'
    }
  ];

  const handleOpenEdit = (m: Mandi) => {
    setEditingMandi(m);
    setEditArrivals(m.currentArrivalsTonnes);
    setEditCapacity(m.dailyCapacityTonnes);
    setEditStatus(m.congestionStatus);
  };

  const handleSaveEdit = () => {
    if (!editingMandi) return;
    const updated = updateMandiAdmin(editingMandi.id, {
      currentArrivalsTonnes: editArrivals,
      dailyCapacityTonnes: editCapacity,
      congestionStatus: editStatus,
      updatedBy: currentRole === 'mandi_admin' ? 'Mandi Administrator (Verified)' : 'Platform Ingestion Officer'
    });
    setMandis(updated);
    setEditingMandi(null);
  };

  const getStatusStyle = (status: Mandi['congestionStatus']) => {
    switch (status) {
      case 'Free':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Moderate':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Congested':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Gate Hold':
        return 'bg-rose-50 text-rose-800 border-rose-200';
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <Warehouse className="w-4 h-4 text-emerald-600" />
            <span>Mandi Yard Throughput, Infrastructure & Future Congestion Forecasting</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">{t.capacity.title}</h1>
          <p className="text-sm text-slate-500">{t.capacity.subtitle}</p>
        </div>

        {currentRole === 'mandi_admin' && (
          <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 self-start md:self-auto">
            ✓ Logged in as Mandi Administrator (Direct Gate Control Enabled)
          </div>
        )}
      </div>

      {/* Verified Live vs Estimated Banner Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 leading-relaxed">
          <strong className="text-slate-800">Capacity Data Integrity Policy:</strong> Mandis labeled{' '}
          <span className="font-bold text-emerald-800 bg-emerald-100/70 px-1.5 py-0.2 rounded">LIVE VERIFIED</span>{' '}
          have real-time automated electronic weighbridge telematics and APMC gate officer updates. Mandis labeled{' '}
          <span className="font-bold text-amber-800 bg-amber-100/70 px-1.5 py-0.2 rounded">ESTIMATED (ML MODEL)</span>{' '}
          use historical 3-year arrival patterns to forecast capacity since official real-time APIs are not published.
        </div>
      </div>

      {/* Mandi Cards Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mandis.slice(0, 4).map(m => {
          const utilization = Math.min(100, Math.round((m.currentArrivalsTonnes / m.dailyCapacityTonnes) * 100));
          const isSelected = selectedMandi.id === m.id;

          return (
            <div
              key={m.id}
              onClick={() => setSelectedMandiId(m.id)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-600/20'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-1 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {m.district}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase ${getStatusStyle(
                      m.congestionStatus
                    )}`}
                  >
                    {m.congestionStatus}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm">{m.name}</h3>

                {/* Live vs Estimated Badge */}
                <div className="mt-1">
                  {m.id === 'mandi-yeshwantpur' || m.id === 'mandi-kolar' ? (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                      ● Live Verified Telematics
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-1.5 py-0.5 rounded">
                      ▲ Estimated (Historical Inflow)
                    </span>
                  )}
                </div>

                {/* Utilization Progress Bar */}
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600">Capacity Load</span>
                    <span className="text-slate-900 font-mono">{utilization}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      style={{ width: `${utilization}%` }}
                      className={`h-2 rounded-full ${
                        utilization > 85 ? 'bg-rose-600' : utilization > 65 ? 'bg-amber-500' : 'bg-emerald-600'
                      }`}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Avail: {m.dailyCapacityTonnes - m.currentArrivalsTonnes} T</span>
                <span className="font-bold text-emerald-700">Inspect Deep</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Mandi Deep Inspection Dashboard */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Detailed Yard Infrastructure Profile
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-600 font-mono">{selectedMandi.operatingHours}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">{selectedMandi.name}</h2>
            <p className="text-xs text-slate-500">
              District: {selectedMandi.district} · Officer In-Charge: {selectedMandi.updatedBy} · Contact: {selectedMandi.contactNumber}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs text-slate-400 block font-semibold">Available Yard Capacity</span>
              <span className="text-2xl font-black text-emerald-800 font-mono">
                {Math.max(0, selectedMandi.dailyCapacityTonnes - selectedMandi.currentArrivalsTonnes)} Tonnes
              </span>
            </div>

            {(currentRole === 'mandi_admin' || currentRole === 'platform_admin') && (
              <button
                onClick={() => handleOpenEdit(selectedMandi)}
                className="flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Update Gate Arrivals</span>
              </button>
            )}
          </div>
        </div>

        {/* Commodity-Wise Capacity Breakdown */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Commodity-Wise Shed & Bay Capacity Allocation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {commodityBreakdown.map((cb, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">{cb.commodity}</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      cb.status === 'Near Full'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {cb.status}
                  </span>
                </div>
                <div className="text-xs text-slate-600">
                  Inflow: <strong>{cb.currentArrivalsTonnes} T</strong> / {cb.maxCapacityTonnes} T
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    style={{ width: `${Math.round((cb.currentArrivalsTonnes / cb.maxCapacityTonnes) * 100)}%` }}
                    className="bg-emerald-600 h-1.5 rounded-full"
                  ></div>
                </div>
                <div className="text-[11px] text-slate-400">
                  {cb.allocatedBays} / {cb.totalBays} Unloading Bays Active
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Congestion Forecasting & Alternative Suggestions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          
          {/* Congestion Forecasting Cards */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Future Yard Congestion Predictions (Next 72 Hours)
            </h3>

            <div className="space-y-2.5">
              {futureCongestion.map((fc, i) => (
                <div
                  key={i}
                  className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{fc.timeHorizon}</span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          fc.riskLevel === 'Severe'
                            ? 'bg-rose-100 text-rose-800'
                            : fc.riskLevel === 'Moderate'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {fc.riskLevel} Congestion Risk ({fc.congestionProbability}%)
                      </span>
                    </div>
                    <div className="text-slate-500 text-[11px] mt-1">
                      Predicted Load: ~{Math.round(fc.predictedArrivalsTonnes)} Tonnes
                    </div>
                  </div>

                  <div className="text-right sm:border-l sm:border-slate-200 sm:pl-4">
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                      Recommended Action
                    </span>
                    <span className="font-bold text-emerald-800 text-[11px]">
                      {fc.recommendedArrivalWindow}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Infrastructure & Alternative Mandi Redirection */}
          <div className="lg:col-span-5 bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-600" />
              Mandi Yard Infrastructure Amenities
            </h3>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span>Electronic Weighbridges:</span>
                <span className="font-bold">4 Units (60 Tonne capacity)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span>Auction Platforms:</span>
                <span className="font-bold">8 Covered Concrete Platforms</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span>Cold Storage Facility:</span>
                <span className="font-bold text-emerald-700">
                  {selectedMandi.coldStorageAvailable ? `${selectedMandi.coldStorageCapacityTonnes} T Active` : 'No Cold Unit'}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span>Farmer Rest Sheds & Canteen:</span>
                <span className="font-bold">Available (Raitha Bhavan)</span>
              </div>
            </div>

            {selectedMandi.congestionStatus === 'Congested' && (
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Congestion Redirection Suggestion:
                </span>
                <p className="text-[11px] leading-relaxed">
                  Due to truck delays at Yeshwantpur, consider routing your produce to <strong>Mysuru Bandipalya</strong> or <strong>Chikkaballapur APMC</strong>, which have 540+ Tonnes available with zero gate waiting.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Admin Capacity Update Modal */}
      {editingMandi && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                Update Capacity: {editingMandi.name}
              </h3>
              <button
                onClick={() => setEditingMandi(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Today's Cumulative Arrivals (Tonnes)
                </label>
                <input
                  type="number"
                  value={editArrivals}
                  onChange={e => setEditArrivals(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Daily Handling Ceiling (Tonnes)
                </label>
                <input
                  type="number"
                  value={editCapacity}
                  onChange={e => setEditCapacity(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Yard Traffic & Gate Status
                </label>
                <select
                  value={editStatus}
                  onChange={e => setEditStatus(e.target.value as Mandi['congestionStatus'])}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="Free">Free (Normal Inflow)</option>
                  <option value="Moderate">Moderate (Queues &lt; 30 mins)</option>
                  <option value="Congested">Congested (Truck Waiting &gt; 1.5 hrs)</option>
                  <option value="Gate Hold">Gate Hold (Unloading Temporarily Paused)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setEditingMandi(null)}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg cursor-pointer shadow-xs"
              >
                Save Capacity Update
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
