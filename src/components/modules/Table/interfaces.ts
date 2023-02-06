import TreeNode from "primereact/treenode";
import { Dispatch, SetStateAction } from "react";

export interface HeaderI {
    isFocused: boolean;
    nodes?: any;
    globalFilter?: string;
    setGlobalFilter: Dispatch<SetStateAction<string | null | undefined>>
}

export interface CustomTreeNode extends TreeNode {
    data?: {
        name: string;
        raw: string;
    },
    isValue?: boolean;
    key?: string | number;
}