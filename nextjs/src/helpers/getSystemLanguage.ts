import i18nConfig from '../../i18n.json';

export function getSystemLanguage(): string {
  if (typeof window === 'undefined') return 'en';

  const browserLang = navigator.language.split('-')[0];
  return i18nConfig.locales.includes(browserLang) ? browserLang : 'en';
}
