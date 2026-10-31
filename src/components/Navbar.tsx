import React from 'react';
import { useTranslation } from '../i18n/context';
import { Language, UserRole } from '../types';
import { Mic, Bot, Globe, Shield, Bell, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenVoice: () => void;
  onOpenAssistant: () => void;
  activeTab: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenVoice, onOpenAssistant }) => {
  const { language, setLanguage, t, currentRole, setCurrentRole } = useTranslation();

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' }
  ];

  const roles: { id: UserRole; label: string }[] = [
    { id: 'farmer', label: 'Farmer (ರೈತ / किसान)' },
    { id: 'expert', label: 'Agri Expert (KVK/ICAR)' },
    { id: 'trader', label: 'Trader / Buyer' },
    { id: 'mandi_admin', label: 'Mandi APMC Admin' },
    { id: 'platform_admin', label: 'Platform Admin' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-bold text-xl shadow-sm">
            M
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-slate-900">{t.appName}</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                v2.0
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              {t.appTagline}
            </p>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Voice query trigger button */}
          <button
            onClick={onOpenVoice}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
            title="Voice Assistant"
            aria-label="Activate voice assistant"
          >
            <Mic className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span className="hidden md:inline font-medium">
              {language === 'kn' ? 'ಧ್ವನಿ ಸಹಾಯಕ' : language === 'hi' ? 'आवाज सहायक' : 'Voice Assistant'}
            </span>
          </button>

          {/* AI Assistant Chat trigger */}
          <button
            onClick={onOpenAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-sm cursor-pointer"
            title="Mandi AI Chat"
            aria-label="Open Mandi AI Assistant"
          >
            <Bot className="w-4 h-4" />
            <span className="hidden md:inline">Mandi AI</span>
          </button>

          {/* Language Switcher */}
          <div className="relative flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <Globe className="w-4 h-4 text-slate-500 ml-1.5 mr-1" />
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  language === lang.code
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title={lang.label}
              >
                {lang.native}
              </button>
            ))}
          </div>

          {/* Role Switcher */}
          <div className="hidden lg:flex items-center gap-1 text-xs text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
            <Shield className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-500">{t.common.switchRole}</span>
            <select
              value={currentRole}
              onChange={e => setCurrentRole(e.target.value as UserRole)}
              className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer pr-1"
            >
              {roles.map(r => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>
    </header>
  );
};
