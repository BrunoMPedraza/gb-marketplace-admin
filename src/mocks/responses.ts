import { IgetTranslations, IputTranslations } from "./interfaces";
import ES from '../locales/es/translationES.json'
import EN from '../locales/en/translationEN.json'

export const getTranslations:IgetTranslations[] = [
    {
        lang_id: 'es',
        content: ES,
    },
    {
        lang_id: 'en',
        content: EN,
    }
]

export const putTranslations:IputTranslations[] = [
    {
        uploaded: true,
        key: "marketplace/json/translations/en.json"
    },
    {
        uploaded: true,
        key: "marketplace/json/translations/es.json"
    }
]