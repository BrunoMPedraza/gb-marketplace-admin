
import React, { ChangeEvent , useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { HeaderI, Languages } from './interfaces';
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { useStore } from '../../../store';
import Modal from '../Modal';
import TableEditorModalContent from './edit/modalContent';

export const Header = ({addNode, globalFilter, selectedNodeKey, setGlobalFilter, isFocused }:HeaderI) => {
    const ref = useRef<HTMLInputElement>(null)
    const translations: Languages[] = ['es', 'en'];

    const { pickedLang, setPickedLang } = useStore()
    const handleInputChange = (event:ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        if ( !isFocused ){
            setGlobalFilter(value)
        }
    }

    useEffect(()=>{
        if ( isFocused ){
            ref.current?.focus()
        }
    },[isFocused])

    return (
        <div className="text-right" >
        <div className="p-input-icon-left" style={{display: 'flex', flexDirection:'row',gap: 24, alignItems: 'center'}}>
            <span>
                <i className="pi pi-search"/>
                <InputText type="search" 
                ref={ref}
                value={globalFilter}
                onChange={handleInputChange}
                placeholder="Buscar" 
                size={50} />
            </span>
            <SelectButton 
            options={translations} 
            value={pickedLang} 
            onChange={(e: SelectButtonChangeEvent) => setPickedLang(e.value)} 
            unselectable={false}
            />
            <Modal 
            label='Añadir nodo' title='Añadir un nodo' 
            content={
                <TableEditorModalContent 
                addNodeFn={addNode} 
                baseNode={selectedNodeKey}
                />
            } 
            />
        </div>
        </div>
    )
}