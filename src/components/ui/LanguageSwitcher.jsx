import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import Icon from '../AppIcon';
import Button from './Button';

const LanguageSwitcher = () => {
  const { language, changeLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: t('language.english'), flag: '🇺🇸' },
    { code: 'pt', name: t('language.portuguese'), flag: '🇧🇷' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-primary/10 transition-colors duration-micro"
        aria-label="Change language"
      >
        <div className="flex items-center space-x-2">
          <span className="text-lg">{currentLanguage?.flag}</span>
          <span className="hidden sm:inline text-sm font-medium text-text-secondary">
            {currentLanguage?.name}
          </span>
          <Icon 
            name={isOpen ? 'ChevronUp' : 'ChevronDown'} 
            size={16} 
            className="text-text-secondary"
          />
        </div>
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-neo shadow-neo-ambient z-50 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors duration-micro ${
                  language === lang.code
                    ? 'bg-primary/10 text-primary' :'text-text-secondary hover:bg-primary/5 hover:text-text-primary'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {language === lang.code && (
                  <Icon name="Check" size={16} className="ml-auto text-primary" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;