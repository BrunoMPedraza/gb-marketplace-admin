import { KeyboardEvent, useState } from "react"
import { EDIT, KEYDOWN_COOLDOWN, SEARCH } from "./constants"

const useBindings = () => {
    const [ focusSearchActive, setFocusSearchActive ] = useState<boolean>(false)
    const handleKeyBindings = (key:KeyboardEvent<HTMLDivElement>) => {
        const { code } = key
        if ( SEARCH.includes(code)){
            searchFn()
        }
    }


    const searchFn = () => {
        setFocusSearchActive(true)
        const cleanup = setTimeout(() => {
            setFocusSearchActive(false)
        }, KEYDOWN_COOLDOWN);
        return ()=>clearInterval(cleanup)
    }

    return { handleKeyBindings, focusSearchActive }
}

export default useBindings