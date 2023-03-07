import { newLangValues } from "../interfaces";

export interface ITableEditorModalContent{
    addNodeFn: (result: newLangValues, newKey: string)=>void;
    baseNode?: string;
}