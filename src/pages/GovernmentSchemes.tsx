import React from 'react';
import { useTranslation } from '../i18n/context';
import { GOVERNMENT_SCHEMES_DATA } from '../data/marketPrices';
import { Award, ExternalLink, CheckCircle2, ShieldCheck, Calendar, Info } from 'lucide-react';

export const GovernmentSchemes: React.FC = () => {
  const { t, language } = useTranslation();

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <Award className="w-4 h-4 text-emerald-600" />
          <span>Verified Central & State Agricultural Welfare Programs</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">{t.nav.schemes}</h1>
        <p className="text-sm text-slate-500">
          Official eligibility guidelines, subsidy quantum, and direct government portal access for Karnataka and Indian farmers.
        </p>
      </div>

      {/* Notice Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 leading-relaxed">
          <strong>Official Transparency Note:</strong> MANDI AI provides authenticated information and direct links to government portals (DBT, Samrakshane, PM-KISAN). We do not collect private banking passwords or charge fees for scheme access.
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {GOVERNMENT_SCHEMES_DATA.map(scheme => (
          <div
            key={scheme.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {scheme.beneficiary}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">
                    {language === 'kn' ? scheme.nameKn : language === 'hi' ? scheme.nameHi : scheme.name}
                  </h3>
                </div>
              </div>

              {/* Subsidy Highlight */}
              <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Subsidy / Financial Benefit:
                </span>
                <span className="text-sm font-bold text-emerald-800 block mt-0.5">
                  {scheme.subsidyAmount}
                </span>
              </div>

              {/* Eligibility checklist */}
              <div className="mt-4 space-y-1.5">
                <span className="text-xs font-bold text-slate-700 block">
                  Key Eligibility Requirements:
                </span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {scheme.eligibility.map((el, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{el}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Verified: {scheme.verifiedDate}
              </span>
              <a
                href={scheme.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors"
              >
                <span>Open Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
