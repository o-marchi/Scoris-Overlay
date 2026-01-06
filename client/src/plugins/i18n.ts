import { createI18n } from 'vue-i18n';
import en from '@/locales/en';
import ptBR from '@/locales/pt-BR';

// Get user's preferred language from localStorage or browser
const getDefaultLocale = (): string => {
  const saved = localStorage.getItem('locale');
  if (saved && ['en', 'pt-BR'].includes(saved)) {
    return saved;
  }

  // Check browser language
  const browserLang = navigator.language;
  if (browserLang.startsWith('pt')) {
    return 'pt-BR';
  }

  return 'en';
};

const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    'pt-BR': ptBR,
  },
});

export default i18n;
