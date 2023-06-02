import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en', // Язык по умолчанию
    fallbackLng: 'en', // Язык, который будет использован, если выбранный язык не найден
    resources: {
      en: {
        translation: require('../language/en.json'),
      },
      bg: {
        translation: require('../language/bg.json'),
      },
      ro: {
        translation: require('../language/ro.json'),
      },
      ru: {
        translation: require('../language/ru.json'),
      },
    },
  });
  export default i18n;