import React, { useState } from "react"
import { InputText } from "primereact/inputtext"
import { ITableEditorModalContent } from "./interfaces"
import { Button } from "primereact/button"

const TableEditorModalContent = ({addNodeFn, baseNode}:ITableEditorModalContent) =>{
    const [newKey, setNewKey ] = useState<string>('')
    const [esValue, setEsValue] = useState<string>('')
    const [enValue, setEnValue] = useState<string>('')

    const result = { enValue, esValue }
    return <div>
    Ingresando en: {baseNode}
    <InputText
    style={{width: '100%'}} type="text" placeholder='Nombre del Nodo' value={newKey}
    onChange={(e) => setNewKey(e?.target.value)} 
    />  
    <div>
    Textos en español
    <InputText
    style={{width: '100%'}} type="text" placeholder='Contenido del Nodo' value={esValue}
    onChange={(e) => setEsValue(e?.target.value)} 
    />  
    </div>

    <div>
    Textos en inglés
    <InputText
    style={{width: '100%'}} type="text" placeholder='Contenido del Nodo EN' value={enValue}
    onChange={(e) => setEnValue(e?.target.value)} 
    />  
    </div>
    <Button  
    onClick={()=>addNodeFn(result, newKey)} 
    className='p-button-success'
    style={{padding: '1rem 5rem'}}>
        Confirmar
        </Button>
    </div>
}

export default TableEditorModalContent