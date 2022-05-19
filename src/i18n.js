import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)


i18n
    .use(LanguageDetector)
    .use(HttpApi)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        supportedLngs: ['en', 'vn', 'fr'],
        fallbackLng: 'en',
        detection: {
            order: ['cookie', 'htmlTag', 'localStorage', 'sessionStorage', 'navigator', 'path', 'subdomain'],
            caches: ['cookie']
        },
        // react: {
        //     useSuspense: false
        // },
        backend: {
            loadPath: '/assets/locales/{{lng}}/translation.json',
        },
        
    });

export default i18n;