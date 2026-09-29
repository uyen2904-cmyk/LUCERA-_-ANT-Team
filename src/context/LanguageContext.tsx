import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppLanguage = 'vi' | 'en';

interface LanguageContextType {
  language: AppLanguage;
  isVi: boolean;
  setLanguage: (lang: AppLanguage) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  isVi: false,
  setLanguage: () => {},
  toggleLanguage: () => {}
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    try {
      const saved = localStorage.getItem('lucera_app_lang_en_v4');
      if (saved === 'vi' || saved === 'en') {
        return saved;
      }
    } catch {}
    return 'en';
  });

  const isVi = language === 'vi';

  const setLanguage = (newLang: AppLanguage) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem('lucera_app_lang_en_v4', newLang);
      localStorage.setItem('lucera_app_lang_v3', newLang);
      localStorage.setItem('lucera_app_lang', newLang);
    } catch {}
  };

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  useEffect(() => {
    try {
      document.documentElement.lang = language;
    } catch {}
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, isVi, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
