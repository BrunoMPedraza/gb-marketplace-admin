import React, { useState } from "react"
import { InputText } from "primereact/inputtext"
import { ITableEditorModalContent } from "./interfaces"
import { Button } from "primereact/button"

const TableEditorModalContent = ({addNodeFn, baseNode}:ITableEditorModalContent) =>{
    const [nodeTitle, setNodeTitle ] = useState<string>()
    const [nodeContent, setNodeContent] = useState<string>()
    return <div>
    Ingresando en: {baseNode}
    <InputText
    style={{width: '100%'}} type="text" placeholder='Nombre del Nodo' value={nodeTitle}
    onChange={(e) => setNodeTitle(e?.target.value)} 
    />  
    <InputText
    style={{width: '100%'}} type="text" placeholder='Contenido del Nodo' value={nodeContent}
    onChange={(e) => setNodeContent(e?.target.value)} 
    />  
    <Button  
    onClick={()=>addNodeFn(String(nodeTitle), String(nodeContent))} 
    className='p-button-success'
    style={{padding: '1rem 5rem'}}>
        Confirmar
        </Button>
    </div>
}

export default TableEditorModalContent