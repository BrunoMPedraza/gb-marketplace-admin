
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ChangeEvent , useEffect, useRef, useState } from 'react';
import { HeaderI, Languages } from './interfaces';
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { useStore } from '../../../store';

export const Header = ({globalFilter, setGlobalFilter, nodes, isFocused }:HeaderI) => {
    const ref = useRef<HTMLInputElement>(null)
    const translations: Languages[] = ['es', 'en'];
    const { pickedLang, setPickedLang } = useStore()
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)
    const handleInputChange = (event:ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        if ( !isFocused ){
            setGlobalFilter(value)
        }
    }


    const submitChanges = () =>{
        console.log(nodes)
    }

    useEffect(()=>{
        if ( isFocused ){
            ref.current?.focus()
        }
    },[isFocused])


    return (
        <div className="text-right" >
        <div className="p-input-icon-left" style={{display: 'flex', flexDirection:'row',gap: 24}}>
            <>
            <i className="pi pi-search"/>
            <InputText type="search" 
            ref={ref}
            value={globalFilter}
            onChange={handleInputChange}
            placeholder="Buscar" 
            size={50} />
            </>
            <SelectButton options={translations} value={pickedLang} onChange={(e: SelectButtonChangeEvent) => setPickedLang(e.value)} />
            <Button label="Enviar cambios" icon="pi pi-check" 
            loading={loadingSubmit} onClick={()=>submitChanges()} />
        </div>
        </div>
    )
}