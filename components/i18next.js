import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../common/Constants/locales/en.json'
import guj from '../common/Constants/locales/guj.json'
import hin from '../common/Constants/locales/hin.json'

const languageResources = {
    en:{translation:en},
    guj:{translation:guj},
    hin:{translation:hin},
  }

i18next.use(initReactI18next).init(
  {
    compatibilityJSON:'v3',
    resources:languageResources,
    fallbackLng:'en',
    lng:'en',
  }
)

export default i18next;