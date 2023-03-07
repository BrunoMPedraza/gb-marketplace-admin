import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { IModal } from './interfaces';


const Modal = ({ disabled=false, label, title, content, onOpen, confirmFn }:IModal) => {
    
    const [visible, setVisible] = useState<boolean>(false);
    const handleOpen = () => {
        if (onOpen){
            console.log(onOpen)
            onOpen()
        }
        setVisible(true)
    }


    return <div className="card">
        <Button disabled={disabled} 
        label={label}
        icon="pi pi-arrow-down-left" 
        className="p-button-warning" 
        style={{ minWidth: '10rem' }} 
        onClick={handleOpen} 
        />
        <Dialog maximizable  header="Confirmar" visible={visible} position='right' style={{ width: '50vw' }} onHide={() => setVisible(false)} draggable>
            <div style={{display: 'flex', flexDirection: 'column'}}>
            <p className="m-0">
                {title}
            </p>
            <div>
                {content}
            </div>
            {confirmFn && 
            (<div>
                <strong>
                ¿Estás seguro que deseas continuar?
                </strong>
                <span style={{display: 'flex', gap: 24, marginTop: 24}}>
                    <Button disabled={disabled} onClick={()=>confirmFn()} className='p-button-success' style={{padding: '1rem 5rem'}}>Confirmar</Button>
                    <Button disabled={disabled} onClick={()=>setVisible(false)} className='p-button-danger' style={{padding: '1rem 5rem'}}>Cancelar</Button>
                </span>
            </div>)
            }
            </div>
        </Dialog>
    </div>
}

export default Modal