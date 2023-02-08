import { useEffect, useState } from "react"
import { putTranslations } from "../../../services/static.service"
import { useStore } from "../../../store"

const useSubmit = () => {
    const { unsavedChanges } = useStore()
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean | undefined>()
    const onSubmit = async() => {
        setLoading(true)
        try {
            const result:any = await putTranslations('',unsavedChanges)
            setSuccess(true)
        } catch (error) {
            console.error(error)
            setSuccess(false)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if ( typeof success === 'boolean'){
            const cooldown = setTimeout(() => {
                setSuccess(undefined)
            }, 400);
            return ()=>clearTimeout(cooldown)
        }
    },[success])
    return { onSubmit, success, loading }
}
export default useSubmit