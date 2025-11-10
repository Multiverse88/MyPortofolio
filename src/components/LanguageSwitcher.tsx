'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { AVAILABLE_LANGUAGES } from '@/lib/translations';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';

interface LanguageSwitcherProps {
  variant?: 'header' | 'floating' | 'inline';
  showLabel?: boolean;
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'header',
  showLabel = true,
  className = ''
}) => {
  const { language, setLanguage, isLoading } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const capabilities = useDeviceCapabilities();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className={`animate-pulse bg-slate-700 rounded-lg ${
        variant === 'floating' ? 'w-12 h-12' : 'w-20 h-8'
      } ${className}`} />
    );
  }

  const currentLang = AVAILABLE_LANGUAGES.find(lang => lang.code === language);
  
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'id' : 'en';
    setLanguage(newLanguage);
    setIsOpen(false);
    
    // Haptic feedback for mobile
    if (capabilities.isMobile && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  // Floating variant (for mobile)
  if (variant === 'floating') {
    return (
      <motion.div 
        className={`fixed top-4 right-4 z-50 ${className}`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          onClick={toggleLanguage}
          className="w-12 h-12 bg-slate-800/90 backdrop-blur-sm border border-cyan-400/30 rounded-full flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(6, 182, 212, 0.1)' }}
          whileTap={{ scale: 0.95 }}
          title={`Switch to ${language === 'en' ? 'Bahasa Indonesia' : 'English'}`}
        >
          <motion.span 
            className="text-lg"
            key={language}
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentLang?.flag}
          </motion.span>
        </motion.button>
      </motion.div>
    );
  }

  // Header variant (for desktop navigation)
  if (variant === 'header') {
    return (
      <div className={`relative ${className}`}>
        <motion.button
          onClick={handleDropdownToggle}
          className="flex items-center space-x-2 px-3 py-2 bg-slate-800/60 backdrop-blur-sm border border-cyan-400/20 rounded-lg hover:border-cyan-400/40 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-sm">{currentLang?.flag}</span>
          {showLabel && (
            <span className="text-sm text-cyan-100 hidden sm:inline">
              {currentLang?.code.toUpperCase()}
            </span>
          )}
          <motion.svg
            className="w-4 h-4 text-cyan-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 right-0 bg-slate-800/95 backdrop-blur-sm border border-cyan-400/30 rounded-lg shadow-xl z-50 min-w-[200px]"
            >
              {AVAILABLE_LANGUAGES.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-cyan-500/10 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    language === lang.code ? 'bg-cyan-500/20 text-cyan-100' : 'text-gray-300'
                  }`}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <div>
                    <div className="font-medium">{lang.name}</div>
                    <div className="text-xs text-gray-400">{lang.nativeName}</div>
                  </div>
                  {language === lang.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto text-cyan-400"
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay to close dropdown */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  }

  // Inline variant (simple toggle)
  return (
    <motion.button
      onClick={toggleLanguage}
      className={`inline-flex items-center space-x-2 px-3 py-1 bg-slate-700/60 border border-cyan-400/30 rounded-md text-sm hover:bg-slate-700 transition-colors ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        key={language}
        initial={{ rotateY: -90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {currentLang?.flag}
      </motion.span>
      {showLabel && (
        <motion.span
          key={`label-${language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-cyan-100"
        >
          {currentLang?.code.toUpperCase()}
        </motion.span>
      )}
    </motion.button>
  );
};

export default LanguageSwitcher;