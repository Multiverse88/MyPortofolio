'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language, DEFAULT_LANGUAGE, getNestedTranslation } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio-language';

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load language from localStorage or detect from browser
    const loadLanguage = () => {
      try {
        const savedLanguage = localStorage.getItem(STORAGE_KEY) as Language;
        if (savedLanguage && translations[savedLanguage]) {
          setLanguageState(savedLanguage);
        } else {
          // Detect browser language
          const browserLang = navigator.language.split('-')[0];
          if (browserLang === 'id') {
            setLanguageState('id');
          } else {
            setLanguageState('en');
          }
        }
      } catch (error) {
        console.warn('Failed to load language preference:', error);
        setLanguageState(DEFAULT_LANGUAGE);
      } finally {
        // Set timeout to ensure we're not in SSR
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      }
    };

    // Only run on client side
    if (typeof window !== 'undefined') {
      loadLanguage();
    } else {
      setIsLoading(false);
    }
  }, []);

  const setLanguage = (newLanguage: Language) => {
    try {
      setLanguageState(newLanguage);
      localStorage.setItem(STORAGE_KEY, newLanguage);
      
      // Update document language attribute
      document.documentElement.lang = newLanguage;
      
      // Dispatch custom event for other components to listen
      window.dispatchEvent(new CustomEvent('languageChange', { 
        detail: { language: newLanguage } 
      }));
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  };

  const t = (key: string): any => {
    try {
      const currentTranslations = translations[language];
      return getNestedTranslation(currentTranslations, key) || key;
    } catch (error) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Custom hook for easier translation access
export const useTranslation = () => {
  const { t, language } = useLanguage();
  return { t, language };
};