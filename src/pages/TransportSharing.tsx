import React, { useState } from 'react';
import { useTranslation } from '../i18n/context';
import { SHARED_TRANSPORT_TRIPS } from '../data/marketPrices';
import { SharedTransportTrip } from '../types';
import { Truck, Users, Calendar, MapPin, Plus, CheckCircle2, Phone, ArrowRight, X } from 'lucide-react';

export const TransportSharing: React.FC = () => {
  const { t } = useTranslation();
  const [trips, setTrips] = useState<SharedTransportTrip[]>(SHARED_TRANSPORT_TRIPS);
  const [joiningTrip, setJoiningTrip] = useState<SharedTransportTrip | null>(null);
  const [joinQty, setJoinQty] = useState(10);
  const [joinCrop, setJoinCrop] = useState('Tomato');
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  // New trip creation state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newOrigin, setNewOrigin] = useState('Keragodu, Mandya');
  const [newDestination, setNewDestination] = useState('Bengaluru Yeshwantpur APMC');
  const [newVehicle, setNewVehicle] = useState<SharedTransportTrip['vehicleType']>('Eicher 14ft (3.5 Ton)');
  const [newCapacity, setNewCapacity] = useState(35);
  const [newDate, setNewDate] = useState('2026-11-02');
  const [newRate, setNewRate] = useState(85);
  const [newDriver, setNewDriver] = useState('Manjunatha Gowda');
  const [newPhone, setNewPhone] = useState('+91 94812 44901');

  const handleConfirmJoin = () => {
    if (!joiningTrip) return;
    const updated = trips.map(tr => {
      if (tr.id === joiningTrip.id) {
        const newBooked = tr.bookedCapacityQtl + joinQty;
        const newAvail = Math.max(0, tr.totalCapacityQtl - newBooked);
        return {
          ...tr,
          bookedCapacityQtl: newBooked,
          availableCapacityQtl: newAvail,
          participatingFarmers: [
            ...tr.participatingFarmers,
            { farmerName: 'Naveen Kumar (You)', commodity: joinCrop, quantityQtl: joinQty }
          ]
        };
      }
      return tr;
    });

    setTrips(updated);
    setJoiningTrip(null);
    setIsSuccessModal(true);
  };

  const handleCreateTrip = (e: React.FormEvent) => {
    e.preventDefault();
    const newTrip: SharedTransportTrip = {
      id: `trip-${Date.now()}`,
      originVillage: newOrigin,
      destinationMandi: newDestination,
      destinationMandiId: 'mandi-yeshwantpur',
      departureDate: newDate,
      departureTime: '02:00 AM',
      vehicleType: newVehicle,
      totalCapacityQtl: newCapacity,
      bookedCapacityQtl: 0,
      availableCapacityQtl: newCapacity,
      driverName: newDriver,
      driverPhone: newPhone,
      pricePerQuintal: newRate,
      participatingFarmers: [],
      status: 'Open'
    };

    setTrips([newTrip, ...trips]);
    setIsCreateOpen(false);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>Community Logistics & Pooled Freight Freight Optimization</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">{t.nav.transportSharing}</h1>
          <p className="text-sm text-slate-500">
            Pool truck capacity with fellow village farmers heading to high-paying urban APMCs to save 40% on transit charges.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl transition-colors text-xs self-start md:self-auto shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Post Transporter Vehicle</span>
        </button>
      </div>

      {/* Active Pooled Trips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {trips.map(trip => {
          const fillPercentage = Math.round((trip.bookedCapacityQtl / trip.totalCapacityQtl) * 100);

          return (
            <div
              key={trip.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {trip.vehicleType}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-2">
                      {trip.originVillage} → {trip.destinationMandi}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-slate-900 font-mono">
                      ₹{trip.pricePerQuintal}
                    </span>
                    <span className="text-[11px] text-slate-400 block font-medium">/ Quintal</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> {trip.departureDate} at {trip.departureTime}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-emerald-800">
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> {trip.driverName} ({trip.driverPhone})
                  </span>
                </div>

                {/* Capacity Fill Meter */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600">Truck Load Status</span>
                    <span className="text-slate-900 font-mono">
                      {trip.bookedCapacityQtl} / {trip.totalCapacityQtl} Qtl Booked
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      style={{ width: `${fillPercentage}%` }}
                      className="bg-emerald-600 h-2.5 rounded-full transition-all"
                    ></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 pt-0.5">
                    <span className="font-bold text-emerald-700">
                      {trip.availableCapacityQtl} Qtl Space Available
                    </span>
                    <span>Status: {trip.status}</span>
                  </div>
                </div>

                {/* Participating Farmers list */}
                {trip.participatingFarmers.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Farmers Sharing This Trip:
                    </span>
                    <div className="space-y-1 text-xs text-slate-600">
                      {trip.participatingFarmers.map((f, i) => (
                        <div key={i} className="flex justify-between py-0.5">
                          <span className="font-medium text-slate-800">{f.farmerName}</span>
                          <span className="font-mono">{f.quantityQtl} Qtl ({f.commodity})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => setJoiningTrip(trip)}
                  disabled={trip.availableCapacityQtl <= 0}
                  className="w-full flex items-center justify-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer shadow-xs"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Join Trip & Reserve Capacity</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Join Trip Modal */}
      {joiningTrip && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Book Pooled Truck Capacity</h3>
                <p className="text-xs text-slate-500">To {joiningTrip.destinationMandi}</p>
              </div>
              <button
                onClick={() => setJoiningTrip(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Produce Commodity
                </label>
                <select
                  value={joinCrop}
                  onChange={e => setJoinCrop(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="Tomato">Tomato (Crated)</option>
                  <option value="Onion">Onion (Bags)</option>
                  <option value="Potato">Potato (Bags)</option>
                  <option value="Cabbage">Cabbage</option>
                  <option value="Chilli">Green Chilli</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Quantity to Transport:</span>
                  <span className="text-emerald-700 font-bold">{joinQty} Quintals</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={joiningTrip.availableCapacityQtl}
                  value={joinQty}
                  onChange={e => setJoinQty(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Freight Rate:</span>
                  <span className="font-mono">₹{joiningTrip.pricePerQuintal} / Qtl</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-200">
                  <span>Your Total Transport Cost:</span>
                  <span className="font-mono text-emerald-800">
                    ₹{(joinQty * joiningTrip.pricePerQuintal).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setJoiningTrip(null)}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmJoin}
                className="px-4 py-2 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg cursor-pointer shadow-xs"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation modal */}
      {isSuccessModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Capacity Reserved Successfully!</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your {joinQty} Quintals of {joinCrop} have been booked with driver. Pickup coordinates shared via SMS.
            </p>
            <button
              onClick={() => setIsSuccessModal(false)}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 rounded-xl text-xs cursor-pointer shadow-xs"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Create Transporter Trip Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateTrip}
            className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Register Pooled Delivery Trip</h3>
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Origin Village</label>
                <input
                  type="text"
                  required
                  value={newOrigin}
                  onChange={e => setNewOrigin(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Destination Mandi</label>
                <input
                  type="text"
                  required
                  value={newDestination}
                  onChange={e => setNewDestination(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Vehicle Type</label>
                  <select
                    value={newVehicle}
                    onChange={e => setNewVehicle(e.target.value as SharedTransportTrip['vehicleType'])}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Tata Ace (1 Ton)">Tata Ace (1 Ton)</option>
                    <option value="Eicher 14ft (3.5 Ton)">Eicher 14ft (3.5 Ton)</option>
                    <option value="Eicher 17ft (6 Ton)">Eicher 17ft (6 Ton)</option>
                    <option value="Tractor Trailer (3 Ton)">Tractor Trailer (3 Ton)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Total Capacity (Qtl)</label>
                  <input
                    type="number"
                    value={newCapacity}
                    onChange={e => setNewCapacity(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Departure Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={e => setNewDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Rate ₹ / Quintal</label>
                  <input
                    type="number"
                    value={newRate}
                    onChange={e => setNewRate(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Transporter / Driver Name</label>
                  <input
                    type="text"
                    value={newDriver}
                    onChange={e => setNewDriver(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={e => setNewPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg cursor-pointer shadow-xs"
              >
                Publish Trip
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
