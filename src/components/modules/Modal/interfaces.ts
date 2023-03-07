import { ReactNode } from "react";

export interface IModal {
    label: string;
    disabled?: boolean;
    title: string;
    content?: ReactNode;
    onOpen?: ()=>void;
    confirmFn?: ()=>void;
}