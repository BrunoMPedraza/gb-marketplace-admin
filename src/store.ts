import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { Languages } from "./components/modules/Table/interfaces";

export interface contentObj {
    lang_id: Languages;
    content: Record<string,string>
}

interface Store {
    pickedLang: Languages;
    originalTranslations: contentObj[];
    unsavedChanges:contentObj[];
    isDiff:{ es: boolean, en: boolean };
    setIsDiff: (es: boolean, en: boolean) => void;
    clearUnsaved: ()=> void;
    setOriginalTranslations: (data: contentObj[]) => void;
    setPickedLang: (target: Languages) => void;
    setUnsavedChanges: (payload: contentObj[]) => void;
}

interface Auth {
    token: string;
    setToken: (newToken: string) => void;
}

const emptyTranslationBody:contentObj[] = [{lang_id: 'es', content: {}}, {lang_id: 'en', content: {}}]

export const useAuth = create<Auth>()(
    persist(
        (set)=>({
            token: '',
            setToken: (newToken)=>{
                set({token: newToken})
            }
        }),
        {name: 'auth-token'}
    )
)

export const useStore = create<Store>()(
    persist(
        (set)=> ({
            pickedLang: 'es',
            originalTranslations: emptyTranslationBody,
            unsavedChanges: emptyTranslationBody,
            isDiff: {es: false, en: false},
            setPickedLang: (target) =>{
                set({pickedLang:target})
            },
            setOriginalTranslations: (data) => {
                set({ originalTranslations: data
                });
            },
            setUnsavedChanges: (payload) => {
                set({ unsavedChanges: payload  });
            },
            setIsDiff: (es, en )=>{
                set({isDiff: {es, en}}
                )},
            clearUnsaved: () => {
                set({unsavedChanges:emptyTranslationBody})
            }
        }),
        { name: 'translation-store'}
    )
);