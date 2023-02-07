import React, { useEffect, useState } from 'react'
import { getTranslations } from '../../../services/static.service'
import { useStore, useAuth, contentObj } from '../../../store'

const useJSON = () => {
    const { pickedLang, originalTranslations, setOriginalTranslations } = useStore()
    const { token } = useAuth()
    const [loading, setLoading] = useState<boolean>(true)
    const [content, setContent] = useState<Record<string,string>>()


    useEffect(()=>{
        if ( !loading ){
            const filteredArray = originalTranslations.filter(element => element.lang_id === pickedLang);
            const { content:pickedContent } = filteredArray[0]
            setContent(pickedContent)
        }
    },[loading, originalTranslations, pickedLang])

    const preload = async() => {
        try {
            const result:any = await getTranslations(token)
            setOriginalTranslations(result)
        } catch (error) {
            console.error(error)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        preload()
    },[])
    return { content }
}

export default useJSON