import React, { useEffect, useState } from 'react'
import { getTranslations } from '../../../services/static.service'
import { useStore, useAuth } from '../../../store'

const useJSON = () => {
    const { setOriginalTranslations } = useStore()
    const { token } = useAuth()
    const [loading, setLoading] = useState<boolean>(true)
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

    return { loading }
}

export default useJSON