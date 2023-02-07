import { Languages } from "../components/modules/Table/interfaces";

export interface IputTranslations {
    uploaded: boolean;
    key: string;
}

export interface IgetTranslations {
    lang_id: Languages;
    content: Record<string,any>;
}