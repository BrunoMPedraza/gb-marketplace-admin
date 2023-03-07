import TreeNode from "primereact/treenode";
import { Dispatch, SetStateAction } from "react";

export interface HeaderI {
    addNode: (newKey:string, newValue:string)=>void;
    isFocused: boolean;
    selectedNodeKey: string;
    nodes: CustomTreeNode[];
    globalFilter?: string;
    setGlobalFilter: Dispatch<SetStateAction<string | null | undefined>>
}

export interface IFooter {
    onSubmit: () => void;
}

export interface NewNode {
    key: string;
    value: string;
}

export interface CustomTreeNode extends TreeNode {
    data?: {
        name?: string;
        raw: string;
    },
    isValue?: boolean;
    key?: string | number;
}

export type Languages = 'es' | 'en'