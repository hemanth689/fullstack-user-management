import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) // load translation files
  .use(LanguageDetector) // detect browser language
  .use(initReactI18next) // integrate with React
  .init({
    supportedLngs: ['en', 'hi'],
    fallbackLng: 'en',
    debug: true, // set to false in production

    interpolation: {
      escapeValue: false, // React already escapes
    },

    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

export default i18n;
