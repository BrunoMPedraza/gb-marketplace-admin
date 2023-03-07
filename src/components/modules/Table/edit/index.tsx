import React, { KeyboardEvent, useState } from "react"
import { EDIT } from "../constants"
import { InputText } from 'primereact/inputtext';

export const InputTextEditor = ({options, addNewChain, editNode}:any) => {
    const [tempEditedField, setTempEditedField ] = useState<string>()
    
    const { name } = options.node.data
    const { raw:value } = options.rowData
    const quickConfirm = ( key: KeyboardEvent<HTMLInputElement>) => {
        const { code } = key
        if ( EDIT.includes(code)){
            handleConfirm()
        }
    }
    const handleConfirm = () => {
        editNode(options, tempEditedField )
        setTempEditedField('')
    }
    
    const handleNewChainConfirm = () => {
        addNewChain(options, tempEditedField)
        setTempEditedField('')
    }


    
    return (
        <span style={{display: 'flex', flexDirection:'row', gap: 12}}>
            <InputText 
            onKeyDown={quickConfirm} 
            style={{width: '100%'}} type="text" placeholder={value} value={tempEditedField}
            onChange={(e) => setTempEditedField(e?.target.value)} 
            />   
        </span>
    );
}