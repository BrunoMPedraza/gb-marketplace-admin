import { Toast } from "primereact/toast"
import { useEffect, useRef, useState } from "react"
import { putTranslations } from "../services/static.service"
import { useStore } from "../store"

const useUpdateS3 = () => {
    const { unsavedChanges } = useStore()
    const toast = useRef<Toast>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean | undefined>()
    const onSubmit = async() => {
        setLoading(true)
        try {
            await putTranslations('',unsavedChanges)
            setSuccess(true)
        } catch (error) {
            console.error(error)
            setSuccess(false)
        }finally{
            setLoading(false)
        }
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
        if ( typeof success === 'boolean'){
            show(success)
            const cooldown = setTimeout(() => {
                setSuccess(undefined)
            }, 400);
            return ()=>clearTimeout(cooldown)
        }
    },[success])
    return { onSubmit, toast,  success, loading }
}
export default useUpdateS3