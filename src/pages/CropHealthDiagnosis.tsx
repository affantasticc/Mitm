import React, { useState } from 'react';
import { useTranslation } from '../i18n/context';
import { diagnosePlantImage } from '../services/gemini';
import { saveDiagnosis, getStoredDiagnoses } from '../services/storage';
import { CropDiseaseDiagnosis } from '../types';
import {
  ScanEye,
  Upload,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Leaf,
  ShieldAlert,
  Send,
  History,
  Sparkles
} from 'lucide-react';

export const CropHealthDiagnosis: React.FC = () => {
  const { t, language } = useTranslation();
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [selectedPart, setSelectedPart] = useState('Leaves');
  const [symptomText, setSymptomText] = useState('Concentric dark brown circular spots with yellow halo on lower leaves');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [currentDiagnosis, setCurrentDiagnosis] = useState<CropDiseaseDiagnosis | null>(null);
  const [diagnosesHistory, setDiagnosesHistory] = useState<CropDiseaseDiagnosis[]>(getStoredDiagnoses);
  const [escalated, setEscalated] = useState(false);

  const sampleSymptoms = [
    'Concentric target-like rings on lower leaves',
    'Upward leaf curl and bushy stunted stems',
    'Ash-grey eye shaped lesions with brown margins',
    'Water-soaked purple blotches with drying tips',
    'Sawdust frass and shot-holes in leaf whorls'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSimulateCamera = () => {
    // High quality botanical sample preview
    setSelectedImage('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%232d6a4f"/><circle cx="200" cy="150" r="80" fill="%23e76f51"/><circle cx="200" cy="150" r="60" fill="%23f4a261"/><circle cx="200" cy="150" r="30" fill="%234a1c17"/><text x="50%" y="85%" font-family="sans-serif" font-size="14" fill="white" text-anchor="middle">Field Camera Sample: Foliar Target Ring</text></svg>');
  };

  const handleRunDiagnosis = async () => {
    setIsDiagnosing(true);
    setEscalated(false);
    try {
      const result = await diagnosePlantImage(selectedCrop, selectedPart, symptomText, selectedImage || undefined);
      setCurrentDiagnosis(result);
      saveDiagnosis(result);
      setDiagnosesHistory(getStoredDiagnoses());
    } catch (err) {
      console.error(err);
    } finally {
      setIsDiagnosing(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <ScanEye className="w-4 h-4 text-emerald-600" />
          <span>ICAR-IIHR Plant Pathology Vision Model</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">{t.cropHealth.title}</h1>
        <p className="text-sm text-slate-500">{t.cropHealth.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Input Form Column */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Camera className="w-4 h-4 text-emerald-700" />
            Capture / Upload Crop Photo
          </h2>

          {/* Photo box */}
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center text-center bg-slate-50 min-h-[180px] relative overflow-hidden">
            {selectedImage ? (
              <div className="relative w-full h-44 flex items-center justify-center bg-slate-900 rounded-lg overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Crop sample"
                  className="max-h-full max-w-full object-contain"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 bg-slate-900/80 text-white text-xs px-2 py-1 rounded cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-xs text-slate-600">
                  <label className="font-semibold text-emerald-700 hover:underline cursor-pointer">
                    Upload Leaf Photograph
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[11px] text-slate-400 mt-0.5">JPEG, PNG or smartphone camera snapshot</p>
                </div>
                <button
                  onClick={handleSimulateCamera}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5 text-slate-500" />
                  <span>Use Sample Field Photo</span>
                </button>
              </div>
            )}
          </div>

          {/* Crop & Part Selection */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Crop Type</label>
              <select
                value={selectedCrop}
                onChange={e => setSelectedCrop(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="Tomato">Tomato</option>
                <option value="Onion">Onion</option>
                <option value="Potato">Potato</option>
                <option value="Paddy">Paddy</option>
                <option value="Maize">Maize</option>
                <option value="Chilli">Chilli</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Affected Part</label>
              <select
                value={selectedPart}
                onChange={e => setSelectedPart(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="Leaves">Leaves / Foliage</option>
                <option value="Stem">Stem / Vine</option>
                <option value="Fruit">Fruit / Pod</option>
                <option value="Roots">Roots / Crown</option>
              </select>
            </div>
          </div>

          {/* Observed symptoms */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Observed Symptoms Description
            </label>
            <textarea
              rows={3}
              value={symptomText}
              onChange={e => setSymptomText(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              placeholder="Describe discoloration, spots, curling, insects, or rot..."
            />

            {/* Quick symptom pills */}
            <div className="mt-2 flex flex-wrap gap-1">
              {sampleSymptoms.slice(0, 3).map((sym, idx) => (
                <button
                  key={idx}
                  onClick={() => setSymptomText(sym)}
                  className="text-[11px] text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded cursor-pointer transition-colors truncate max-w-full"
                >
                  + {sym}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleRunDiagnosis}
            disabled={isDiagnosing}
            className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl transition-colors shadow-sm cursor-pointer text-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isDiagnosing ? 'Running AI Vision Analysis...' : t.cropHealth.diagnoseButton}</span>
          </button>
        </div>

        {/* Diagnosis Results Column */}
        <div className="lg:col-span-7 space-y-4">
          {currentDiagnosis ? (
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-5">
              
              {/* Disease Title Banner */}
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
                    {currentDiagnosis.causativeAgent} Pathogen Identified
                  </span>
                  <span className="text-xs font-semibold text-emerald-800">
                    Confidence: {Math.round(currentDiagnosis.confidenceScore * 100)}%
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mt-2">
                  {language === 'kn'
                    ? currentDiagnosis.identifiedDiseaseKn
                    : language === 'hi'
                    ? currentDiagnosis.identifiedDiseaseHi
                    : currentDiagnosis.identifiedDisease}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Scientific Name: {currentDiagnosis.identifiedDisease} · Crop: {currentDiagnosis.crop}
                </p>
              </div>

              {/* Organic & Biological Remedies */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  {t.cropHealth.organicCure}
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-700 bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100">
                  {currentDiagnosis.organicTreatments.map((treat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold">•</span>
                      <span>{treat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ICAR Approved Chemical Spray */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-blue-600" />
                  {t.cropHealth.chemicalCure} (With Dilution & Waiting Period)
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-700 bg-blue-50/50 p-3.5 rounded-xl border border-blue-100">
                  {currentDiagnosis.chemicalTreatmentsICAR.map((treat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-700 font-bold">•</span>
                      <span>{treat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preventive Practices */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {t.cropHealth.preventiveCare}
                </h3>
                <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
                  {currentDiagnosis.preventiveMeasures.map((prev, i) => (
                    <li key={i}>{prev}</li>
                  ))}
                </ul>
              </div>

              {/* Escalation to KVK Scientist */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  Uncertain about symptoms? Connect directly with KVK Mandya scientists.
                </div>
                {escalated ? (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                    ✓ Case Escalated to KVK Agronomist (Case ID #KVK-842)
                  </span>
                ) : (
                  <button
                    onClick={() => setEscalated(true)}
                    className="flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t.cropHealth.escalateExpert}</span>
                  </button>
                )}
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-xl p-10 border border-slate-200 shadow-xs text-center flex flex-col items-center justify-center space-y-3 min-h-[350px]">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <ScanEye className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Ready for Diagnostic Scan</h3>
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                Upload a clear close-up photograph of infected leaves or stems, select the crop, and run our vision model for instant treatment.
              </p>
            </div>
          )}

          {/* Past Diagnoses History */}
          {diagnosesHistory.length > 0 && (
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5" />
                  {t.cropHealth.recentDiagnoses}
                </span>
                <span>{diagnosesHistory.length} Recorded</span>
              </div>
              <div className="space-y-2">
                {diagnosesHistory.slice(0, 3).map(d => (
                  <div
                    key={d.id}
                    onClick={() => setCurrentDiagnosis(d)}
                    className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors cursor-pointer text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-800">{d.crop}: {d.identifiedDisease}</span>
                      <p className="text-slate-500 text-[11px] mt-0.5">{d.symptomsReported[0]}</p>
                    </div>
                    <span className="text-[11px] text-slate-400 shrink-0">
                      {new Date(d.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
