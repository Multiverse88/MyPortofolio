import { en } from './en';
import { id } from './id';

export const translations = {
  en,
  id
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

// Helper function to get nested translation
export const getNestedTranslation = (obj: any, path: string): any => {
  try {
    const result = path.split('.').reduce((current, key) => {
      return current && typeof current === 'object' ? current[key] : undefined;
    }, obj);
    
    return result !== undefined ? result : path;
  } catch (error) {
    console.warn(`Translation error for path: ${path}`, error);
    return path;
  }
};

// Default language
export const DEFAULT_LANGUAGE: Language = 'en';

// Available languages for the language selector
export const AVAILABLE_LANGUAGES = [
  { code: 'en' as Language, name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'id' as Language, name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
] as const;