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
    setOriginalTranslations: (data: contentObj[]) => void;
    setPickedLang: (target: Languages) => void;
    setUnsavedChanges: (target: Languages, content: Record<string,string>) => void;
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
            setPickedLang: (target) =>{
                set({pickedLang:target})
            },
            setOriginalTranslations: (data) => {
                set({ originalTranslations: data
                });
            },
            setUnsavedChanges: (target, content) => {
                set(state => {
                  return { unsavedChanges: [...state.unsavedChanges, { lang_id: target, content: content }] };
                });
              }
        }),
        { name: 'translation-store'}
    )
);