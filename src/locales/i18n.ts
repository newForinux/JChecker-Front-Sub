import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ENG from './langpack/en.json';
import KOR from './langpack/ko.json';

export const languages = [ 'en', 'ko' ] as const;

export type Languages = typeof languages[number];


const resources = {
    en: { translation: ENG },
    ko: { translation: KOR },
}

const userLanguage = window.navigator.language;


i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem('language') || userLanguage || 'ko',
    fallbackLng: 'ko',
    keySeparator: false,
    interpolation: {
        escapeValue: false
    }
})

export default i18n;