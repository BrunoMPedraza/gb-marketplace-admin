import React, { useEffect, useRef, useState } from 'react'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { IModal } from './interfaces';
import { Toast } from 'primereact/toast';
import useSubmit from './useSubmit';


const Modal = ({ disabled=false, saveChanges }:IModal) => {
    
    const toast = useRef<Toast>(null);
    const { onSubmit, success, loading } = useSubmit()
    const [visible, setVisible] = useState<boolean>(false);
    const handleOpen = () => {
        saveChanges()
        setVisible(true)
    }
    
    const show = ( success: boolean) => {
        if ( toast.current ){
            toast.current.show({ 
                severity: success ? 'success' : 'error', 
                summary: 'PUT', 
                detail: success ? 'Se han enviado los cambios' : 'Ocurrió un error' });
        }
    };

    useEffect(()=>{
        console.log(success)
        if ( typeof success === 'boolean' ){
            show(success)
        }
    },[success])

    return <div className="card">
        <Toast ref={toast} />
        <Button disabled={disabled || loading} 
        label="Enviar cambios" 
        icon="pi pi-arrow-down-left" 
        className="p-button-warning" 
        style={{ minWidth: '10rem' }} 
        onClick={handleOpen} 
        />
        <Dialog header="Confirmar" visible={visible} position='right' style={{ width: '50vw' }} onHide={() => setVisible(false)} draggable resizable>
            <div style={{display: 'flex', flexDirection: 'column'}}>
            <p className="m-0">
                Se realizaron cambios, si confirmas se enviarán directo al S3
            </p>
            <strong>
                ¿Estás seguro que deseas continuar?
            </strong>
            <span style={{display: 'flex', gap: 24, marginTop: 24}}>
                <Button disabled={loading} onClick={()=>onSubmit()} className='p-button-success' style={{padding: '1rem 5rem'}}>Enviar</Button>
                <Button disabled={loading} className='p-button-danger' style={{padding: '1rem 5rem'}}>Cancelar</Button>
            </span>
            </div>
        </Dialog>
    </div>
}

export default Modal