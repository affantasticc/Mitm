import React, { useState } from 'react';
import { useTranslation } from '../i18n/context';
import { ACTIVE_PRODUCE_LISTINGS } from '../data/marketPrices';
import { ProduceListing } from '../types';
import { ShoppingBag, Plus, CheckCircle2, Phone, MessageSquare, AlertCircle, X, ArrowRight } from 'lucide-react';

export const BuyerMarketplace: React.FC = () => {
  const { t } = useTranslation();
  const [listings, setListings] = useState<ProduceListing[]>(ACTIVE_PRODUCE_LISTINGS);
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [inquiryModalListing, setInquiryModalListing] = useState<ProduceListing | null>(null);
  const [inquiryText, setInquiryText] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  // New Listing Form state
  const [crop, setCrop] = useState('Tomato');
  const [variety, setVariety] = useState('Hybrid Shivam (Grade A)');
  const [qty, setQty] = useState(40);
  const [grade, setGrade] = useState<ProduceListing['qualityGrade']>('A (Export/Super)');
  const [price, setPrice] = useState(2500);
  const [readyDate, setReadyDate] = useState('2026-11-04');
  const [notes, setNotes] = useState('Freshly harvested in plastic crates, uniform size.');

  // Verified Buyer RFQs (FPOs & Wholesalers)
  const buyerDemands = [
    {
      id: 'rfq-1',
      buyerName: 'BigBasket Wholesale Hub (Bengaluru)',
      buyerType: 'Institutional Retail Buyer',
      commodity: 'Tomato (Grade A)',
      requiredQtyQtl: 200,
      offeredPricePerQtl: 2600,
      pickupType: 'Farmgate Pickup Provided',
      paymentTerms: 'Direct NEFT within 24 hours of weighing',
      location: 'Bengaluru South & Mandya Belt'
    },
    {
      id: 'rfq-2',
      buyerName: 'Mandya District Farmer Producer Org (FPO)',
      buyerType: 'Certified FPO Consortium',
      commodity: 'Ragi (Finger Millet - GPU-28)',
      requiredQtyQtl: 500,
      offeredPricePerQtl: 3550,
      pickupType: 'RSK Aggregation Point',
      paymentTerms: 'Karnataka APMC Direct Settlement',
      location: 'Mandya & Ramanagara'
    }
  ];

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    const newL: ProduceListing = {
      id: `list-${Date.now()}`,
      farmerName: 'Naveen Kumar (You)',
      phone: '+91 98860 12345',
      location: 'Keragodu, Mandya',
      commodity: crop,
      variety,
      quantityQtl: qty,
      qualityGrade: grade,
      expectedPricePerQtl: price,
      readyDate,
      notes,
      status: 'Active',
      inquiriesCount: 0
    };

    setListings([newL, ...listings]);
    setIsListingModalOpen(false);
  };

  const handleSendInquiry = () => {
    if (!inquiryModalListing) return;
    setListings(
      listings.map(l =>
        l.id === inquiryModalListing.id ? { ...l, inquiriesCount: l.inquiriesCount + 1 } : l
      )
    );
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryModalListing(null);
      setInquiryText('');
    }, 1500);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <ShoppingBag className="w-4 h-4 text-emerald-600" />
            <span>Direct Farm-to-Buyer Commercial Exchange</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">{t.nav.buyerMarket}</h1>
          <p className="text-sm text-slate-500">
            List your harvest for direct procurement by certified FPOs, institutional retailers, and exporters without middleman commission.
          </p>
        </div>

        <button
          onClick={() => setIsListingModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl transition-colors text-xs self-start md:self-auto shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>List My Produce for Sale</span>
        </button>
      </div>

      {/* Verified Buyer Procurement Demands (RFQs) */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Institutional & FPO Bulk Purchase Orders
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {buyerDemands.map(rfq => (
            <div
              key={rfq.id}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {rfq.buyerType}
                  </span>
                  <span className="text-sm font-black text-slate-900 font-mono">
                    ₹{rfq.offeredPricePerQtl} / Qtl
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mt-2">{rfq.buyerName}</h3>
                <div className="mt-2 text-xs text-slate-600 space-y-1">
                  <div><strong>Required:</strong> {rfq.requiredQtyQtl} Quintals ({rfq.commodity})</div>
                  <div><strong>Logistics:</strong> {rfq.pickupType}</div>
                  <div><strong>Settlement:</strong> {rfq.paymentTerms}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">{rfq.location}</span>
                <button
                  onClick={() => alert(`Connect request sent to ${rfq.buyerName}. Procurement team will contact your phone.`)}
                  className="flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Submit Supply Offer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Farmer Produce Listings */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Farmer Direct Farmgate Listings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map(l => (
            <div
              key={l.id}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {l.qualityGrade}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base mt-2">{l.commodity}</h3>
                    <p className="text-xs text-slate-500">{l.variety}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900 font-mono">
                      ₹{l.expectedPricePerQtl}
                    </span>
                    <span className="text-[11px] text-slate-400 block font-medium">/ Quintal</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Available Quantity:</span>
                    <span className="font-bold text-slate-800">{l.quantityQtl} Quintals</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ready Date:</span>
                    <span className="font-medium text-slate-700">{l.readyDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Farm Location:</span>
                    <span className="font-medium text-slate-700">{l.location}</span>
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-600 leading-relaxed italic">
                  "{l.notes}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {l.inquiriesCount} Buyer Inquiries
                </span>
                <button
                  onClick={() => setInquiryModalListing(l)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-900 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inquiry Dialog */}
      {inquiryModalListing && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Inquire About Produce</h3>
                <p className="text-xs text-slate-500">{inquiryModalListing.commodity} · {inquiryModalListing.farmerName}</p>
              </div>
              <button
                onClick={() => setInquiryModalListing(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {inquirySent ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900">Inquiry Sent to Farmer!</h4>
                <p className="text-xs text-slate-500">The farmer will receive your procurement offer directly.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Proposed Price & Terms
                  </label>
                  <textarea
                    rows={4}
                    value={inquiryText}
                    onChange={e => setInquiryText(e.target.value)}
                    placeholder="e.g. We are interested in taking all 40 Quintals at ₹2,450/qtl with direct farm pickup tomorrow..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setInquiryModalListing(null)}
                    className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendInquiry}
                    className="px-4 py-2 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg cursor-pointer shadow-xs"
                  >
                    Send Offer to Farmer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Listing Modal */}
      {isListingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateListing}
            className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Create Farmgate Produce Listing</h3>
              <button
                type="button"
                onClick={() => setIsListingModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Crop</label>
                  <input
                    type="text"
                    required
                    value={crop}
                    onChange={e => setCrop(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Variety</label>
                  <input
                    type="text"
                    required
                    value={variety}
                    onChange={e => setVariety(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Quantity (Quintals)</label>
                  <input
                    type="number"
                    required
                    value={qty}
                    onChange={e => setQty(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Quality Grade</label>
                  <select
                    value={grade}
                    onChange={e => setGrade(e.target.value as ProduceListing['qualityGrade'])}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-xs"
                  >
                    <option value="A (Export/Super)">Grade A (Export / Super)</option>
                    <option value="B (Standard Mandi)">Grade B (Standard Mandi)</option>
                    <option value="C (Processing)">Grade C (Processing / Pulp)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Expected Price (₹/Qtl)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Harvest Ready Date</label>
                  <input
                    type="date"
                    required
                    value={readyDate}
                    onChange={e => setReadyDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Packaging & Quality Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsListingModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg cursor-pointer shadow-xs"
              >
                Publish Listing
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
