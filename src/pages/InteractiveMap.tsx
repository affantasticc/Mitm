import React, { useState } from 'react';
import { useTranslation } from '../i18n/context';
import { INITIAL_MANDIS } from '../data/mandis';
import { COLD_STORAGE_FACILITIES, CURRENT_MARKET_OBSERVATIONS } from '../data/marketPrices';
import { calculateRoadDistanceKm } from '../services/optimizer';
import { MapPin, Navigation, Truck, Warehouse, CheckCircle2, ArrowRight } from 'lucide-react';

export const InteractiveMap: React.FC = () => {
  const { t } = useTranslation();
  const [selectedMandiId, setSelectedMandiId] = useState('mandi-yeshwantpur');
  const [showColdStorage, setShowColdStorage] = useState(true);

  // Farmer's location: Mandya
  const farmerLat = 12.5230;
  const farmerLng = 76.8970;

  const selectedMandi = INITIAL_MANDIS.find(m => m.id === selectedMandiId) || INITIAL_MANDIS[0];
  const distance = calculateRoadDistanceKm(farmerLat, farmerLng, selectedMandi.latitude, selectedMandi.longitude);
  const estHours = (distance / 45).toFixed(1); // avg truck speed 45 km/h
  const estDieselCost = Math.round(distance * 12); // ~12 INR per km fuel

  const mandiPrices = CURRENT_MARKET_OBSERVATIONS.filter(o => o.mandiId === selectedMandi.id);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span>Geographical Market Intelligence & Route Logistics</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">Interactive Agri GIS Map</h1>
        <p className="text-sm text-slate-500">
          Spatial mandi network, road transit distances from Mandya farm, and cold storage logistics hubs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Visual Map Canvas / Spatial Grid */}
        <div className="lg:col-span-8 bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 relative min-h-[480px] flex flex-col justify-between overflow-hidden shadow-lg">
          
          {/* Top Controls Overlay */}
          <div className="flex items-center justify-between z-10">
            <div className="bg-slate-800/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-700 text-xs flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="font-semibold text-slate-200">Origin: Mandya (Farm Home)</span>
            </div>

            <button
              onClick={() => setShowColdStorage(!showColdStorage)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                showColdStorage
                  ? 'bg-blue-600/40 border-blue-400 text-blue-200'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              Cold Storage Layer: {showColdStorage ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Interactive SVG Spatial Representation */}
          <div className="relative w-full h-80 my-4 flex items-center justify-center">
            <svg viewBox="0 0 600 360" className="w-full h-full">
              {/* Radial background distance rings */}
              <circle cx="240" cy="200" r="80" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="240" cy="200" r="160" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="240" cy="200" r="240" fill="none" stroke="#1e293b" strokeWidth="1" />

              {/* Transit Route Line from Farmer to Selected Mandi */}
              <line
                x1="240"
                y1="200"
                x2={selectedMandi.longitude > 77.5 ? "380" : selectedMandi.longitude > 76.8 ? "260" : "150"}
                y2={selectedMandi.latitude > 13.1 ? "80" : selectedMandi.latitude > 12.8 ? "130" : "260"}
                stroke="#10b981"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                className="animate-pulse"
              />

              {/* Farmer Location Pin */}
              <g transform="translate(240, 200)">
                <circle r="12" fill="#10b981" fillOpacity="0.3" className="animate-ping" />
                <circle r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                <text x="12" y="4" fill="#6ee7b7" fontSize="11" fontWeight="bold">My Farm (Mandya)</text>
              </g>

              {/* Mandi Pins */}
              {INITIAL_MANDIS.slice(0, 6).map((m, idx) => {
                // Approximate relative spatial coords for Karnataka map projection
                const x = m.id === 'mandi-yeshwantpur' ? 380 : m.id === 'mandi-kolar' ? 490 : m.id === 'mandi-mandya' ? 240 : m.id === 'mandi-mysuru' ? 180 : m.id === 'mandi-chikkaballapur' ? 420 : 150;
                const y = m.id === 'mandi-yeshwantpur' ? 130 : m.id === 'mandi-kolar' ? 110 : m.id === 'mandi-mandya' ? 190 : m.id === 'mandi-mysuru' ? 270 : m.id === 'mandi-chikkaballapur' ? 70 : 60;
                const isSelected = selectedMandi.id === m.id;

                return (
                  <g
                    key={m.id}
                    transform={`translate(${x}, ${y})`}
                    onClick={() => setSelectedMandiId(m.id)}
                    className="cursor-pointer group"
                  >
                    <circle
                      r={isSelected ? "11" : "8"}
                      fill={isSelected ? "#3b82f6" : m.congestionStatus === 'Congested' ? '#f59e0b' : '#38bdf8'}
                      stroke="#ffffff"
                      strokeWidth={isSelected ? "2.5" : "1.5"}
                    />
                    <text
                      x="12"
                      y="4"
                      fill={isSelected ? "#60a5fa" : "#94a3b8"}
                      fontSize={isSelected ? "11" : "9"}
                      fontWeight={isSelected ? "bold" : "normal"}
                    >
                      {m.name.split(' ')[0]} ({m.district})
                    </text>
                  </g>
                );
              })}

              {/* Cold storage markers */}
              {showColdStorage && COLD_STORAGE_FACILITIES.map((cs, idx) => {
                const x = cs.district === 'Kolar' ? 510 : cs.district === 'Mysuru' ? 170 : 395;
                const y = cs.district === 'Kolar' ? 125 : cs.district === 'Mysuru' ? 285 : 145;
                return (
                  <g key={cs.id} transform={`translate(${x}, ${y})`} className="opacity-90">
                    <rect x="-5" y="-5" width="10" height="10" fill="#a855f7" stroke="#ffffff" strokeWidth="1" />
                    <text x="8" y="3" fill="#d8b4fe" fontSize="8">Cold Store</text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom Map Info Footer */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800 z-10">
            <span>Coordinates: 12.5230° N, 76.8970° E</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Active Mandi
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-purple-500"></span> Cold Storage Hub
              </span>
            </div>
          </div>
        </div>

        {/* Selected Mandi Logistics Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                Logistics Route Profile
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {selectedMandi.operatingHours}
              </span>
            </div>

            <h2 className="text-lg font-bold text-slate-900 mt-2">{selectedMandi.name}</h2>
            <p className="text-xs text-slate-500">{selectedMandi.district}, {selectedMandi.state}</p>

            {/* Route metric numbers */}
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 uppercase text-[10px] font-bold block">
                  Transit Distance
                </span>
                <span className="text-xl font-black text-slate-900 font-mono">
                  {distance} km
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 uppercase text-[10px] font-bold block">
                  Est. Travel Time
                </span>
                <span className="text-xl font-black text-slate-900 font-mono">
                  {estHours} hrs
                </span>
              </div>
            </div>

            <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Fuel / Diesel:</span>
                <span className="font-bold text-slate-800 font-mono">~₹{estDieselCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Gate Congestion Status:</span>
                <span className="font-bold text-emerald-700">{selectedMandi.congestionStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Handling Fee:</span>
                <span className="font-medium text-slate-700">₹{selectedMandi.unloadingChargePerQtl}/Qtl</span>
              </div>
            </div>

            {/* Live Prices at this Mandi */}
            <div className="mt-5 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Today's Trading Rates:
              </span>
              {mandiPrices.map(p => (
                <div key={p.id} className="flex justify-between text-xs py-1 border-b border-slate-100">
                  <span className="font-medium text-slate-800">{p.commodityName}</span>
                  <span className="font-bold text-emerald-800 font-mono">₹{p.modalPrice} / Qtl</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <div className="text-[11px] text-slate-500 mb-2">
              APMC Helpline: {selectedMandi.contactNumber}
            </div>
            <button
              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedMandi.latitude},${selectedMandi.longitude}`, '_blank')}
              className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 rounded-xl transition-colors text-xs cursor-pointer shadow-xs"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Launch GPS Navigation</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
