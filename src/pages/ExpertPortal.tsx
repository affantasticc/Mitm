import React, { useState } from 'react';
import { useTranslation } from '../i18n/context';
import { ExpertConsultationRequest } from '../types';
import {
  UserCheck,
  CheckCircle2,
  Clock,
  Send,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Stethoscope
} from 'lucide-react';

export const ExpertPortal: React.FC = () => {
  const { t } = useTranslation();

  const [consultations, setConsultations] = useState<ExpertConsultationRequest[]>([
    {
      id: 'req-1',
      farmerName: 'Naveen Kumar',
      farmerPhone: '+91 98860 12345',
      district: 'Mandya',
      crop: 'Tomato',
      problemSummary: 'Concentric dark target rings on lower foliage; rapid leaf yellowing after morning mist.',
      status: 'Pending',
      createdAt: '2026-10-30 09:15 AM'
    },
    {
      id: 'req-2',
      farmerName: 'Basavaraj Patil',
      farmerPhone: '+91 94812 77890',
      district: 'Kolar',
      crop: 'Tomato',
      problemSummary: 'Severe upward curling on top leaves, plants look stunted and bushy.',
      status: 'Prescribed',
      createdAt: '2026-10-29 03:30 PM',
      expertPrescription: {
        expertName: 'Dr. Ramesh K. (Senior Agronomist, KVK Mandya)',
        diagnosis: 'Tomato Leaf Curl Virus (ToLCV) transmitted by Whitefly vector',
        recommendedTreatment: 'Spray Diafenthiuron 50% WP @ 1g/L water immediately; install yellow sticky traps in field borders.',
        waitingPeriodDays: 7,
        prescribedAt: '2026-10-29 05:00 PM'
      }
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState<ExpertConsultationRequest | null>(consultations[0]);
  const [prescriptionText, setPrescriptionText] = useState('');
  const [waitingPeriod, setWaitingPeriod] = useState(7);
  const [isPrescribing, setIsPrescribing] = useState(false);

  const handleSendPrescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest || !prescriptionText.trim()) return;

    const updated = consultations.map(c => {
      if (c.id === selectedRequest.id) {
        return {
          ...c,
          status: 'Prescribed' as const,
          expertPrescription: {
            expertName: 'Dr. Ramesh K. (Senior Agronomist, KVK Mandya)',
            diagnosis: 'Alternaria solani (Early Blight) confirmed by leaf lesion pattern',
            recommendedTreatment: prescriptionText,
            waitingPeriodDays: waitingPeriod,
            prescribedAt: new Date().toLocaleString()
          }
        };
      }
      return c;
    });

    setConsultations(updated);
    setSelectedRequest(null);
    setPrescriptionText('');
    setIsPrescribing(false);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <Stethoscope className="w-4 h-4 text-emerald-600" />
            <span>KVK / ICAR Certified Agricultural Scientist Consultation Portal</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Agricultural Expert Portal</h1>
          <p className="text-sm text-slate-500">
            Review escalated crop pathology scans, issue ICAR-compliant prescriptions, and guide local farmers.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 text-xs text-emerald-800 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Expert Availability: Online (Dr. Ramesh K., KVK Mandya)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Consultation Requests Queue */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Escalated Cases Queue ({consultations.length})
            </span>
            <span className="text-[11px] text-slate-400">Sort by: Urgency</span>
          </div>

          <div className="space-y-2">
            {consultations.map(c => (
              <div
                key={c.id}
                onClick={() => setSelectedRequest(c)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer text-xs space-y-1 ${
                  selectedRequest?.id === c.id
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{c.farmerName} ({c.district})</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      c.status === 'Pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                <div className="text-slate-600 font-medium">Crop: {c.crop}</div>
                <p className="text-slate-500 text-[11px] line-clamp-2">{c.problemSummary}</p>
                <div className="text-[10px] text-slate-400 pt-1">{c.createdAt}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Request Inspection & Prescription Pad */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          {selectedRequest ? (
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Case #{selectedRequest.id}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">
                    {selectedRequest.crop} Pathology Review for {selectedRequest.farmerName}
                  </h3>
                  <p className="text-xs text-slate-500">Contact: {selectedRequest.farmerPhone} · Location: {selectedRequest.district}</p>
                </div>
              </div>

              {/* Farmer Problem statement */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs">
                <span className="text-[10px] font-bold uppercase text-slate-400">Reported Symptoms:</span>
                <p className="text-slate-800 leading-relaxed font-medium">
                  "{selectedRequest.problemSummary}"
                </p>
              </div>

              {/* Existing prescription if already fulfilled */}
              {selectedRequest.expertPrescription && (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Prescription Fulfilled by {selectedRequest.expertPrescription.expertName}</span>
                  </div>
                  <div className="text-slate-800">
                    <strong>Diagnosis:</strong> {selectedRequest.expertPrescription.diagnosis}
                  </div>
                  <div className="text-slate-800">
                    <strong>Treatment:</strong> {selectedRequest.expertPrescription.recommendedTreatment}
                  </div>
                  <div className="text-slate-600 font-mono text-[11px]">
                    Waiting Period: {selectedRequest.expertPrescription.waitingPeriodDays} Days · Issued: {selectedRequest.expertPrescription.prescribedAt}
                  </div>
                </div>
              )}

              {/* Prescription Entry Form */}
              {selectedRequest.status === 'Pending' && (
                <form onSubmit={handleSendPrescription} className="space-y-4 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Official Agronomic Prescription Pad
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Certified Treatment Dosage & Instructions (ICAR-IIHR Norms)
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={prescriptionText}
                      onChange={e => setPrescriptionText(e.target.value)}
                      placeholder="e.g. Spray Mancozeb 75% WP @ 2g/L water early morning. Drench soil around root zone with Trichoderma viride..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Mandatory Safety Waiting Period (Days before harvest)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={30}
                        value={waitingPeriod}
                        onChange={e => setWaitingPeriod(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Issue Certified Prescription to Farmer</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">
              Select a consultation case from the queue to inspect and prescribe.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
