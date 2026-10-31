import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, UserRole } from '../types';
import { translations, Translations } from './translations';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('mandi_ai_lang');
    if (saved === 'kn' || saved === 'hi' || saved === 'en') return saved;
    return 'en';
  });

  const [currentRole, setCurrentRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('mandi_ai_role');
    if (saved) return saved as UserRole;
    return 'farmer';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('mandi_ai_lang', lang);
  };

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    localStorage.setItem('mandi_ai_role', role);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        currentRole,
        setCurrentRole
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};
