import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('portfolio-language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pt')) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Load translations based on current language
    const loadTranslations = async () => {
      try {
        const translationModule = await import(`../translations/${language}.json`);
        setTranslations(translationModule.default);
      } catch (error) {
        console.error('Error loading translations:', error);
        // Fallback to English if translation fails
        if (language !== 'en') {
          const fallbackModule = await import('../translations/en.json');
          setTranslations(fallbackModule.default);
        }
      }
    };

    loadTranslations();
  }, [language]);

  const changeLanguage = (newLanguage) => {
    if (newLanguage === 'en' || newLanguage === 'pt') {
      setLanguage(newLanguage);
      localStorage.setItem('portfolio-language', newLanguage);
    }
  };

  const t = (key) => {
    const keys = key.split('.');
    let result = translations;
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return result || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};