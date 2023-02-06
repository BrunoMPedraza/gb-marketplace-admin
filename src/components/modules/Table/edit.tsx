import React, { KeyboardEvent, KeyboardEventHandler, useState } from "react"
import { EDIT } from "./constants"
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export const InputTextEditor = ({options, editNode}:any) => {
    const [tempEditedField, setTempEditedField ] = useState<string>()
    const { key:keyArr } = options.node
    const { name } = options.node.data
    const { raw:value } = options.rowData
    const quickConfirm = ( key: KeyboardEvent<HTMLInputElement>) => {
        const { code } = key
        if ( EDIT.includes(code)){
            editNode(keyArr, tempEditedField )
            setTempEditedField('')
        }
    }
    if ( !options.node.isValue ){
        return <>{name}</>
    }
    return (
        <span style={{display: 'flex', flexDirection:'row', gap: 12}}>
            <InputText 
            onKeyDown={quickConfirm} 
            style={{width: '100%'}} type="text" placeholder={value} value={tempEditedField}
            onChange={(e) => setTempEditedField(e?.target.value)} 
            />
            <Button 
            onClick={()=>editNode(keyArr, tempEditedField )}> 
                Confirmar 
            </Button>
        </span>
    );
}