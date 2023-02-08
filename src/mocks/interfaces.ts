import { Languages } from "../components/modules/Table/interfaces";

export interface IputTranslations {
    uploaded: boolean;
    key: string;
}

export interface translationsFormat {
    lang_id: Languages;
    content: Record<string,any>;
}