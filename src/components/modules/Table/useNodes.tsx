import React, { useEffect, useState } from "react";
import TreeNode from "primereact/treenode";
import { formatForSubmit, NodeService, updateNodeInTree } from "../../../services/modules/SearchTab.services";
import { parseKeys } from "../../../services/shared/utilts.services";
import { useStore } from "../../../store";
import { CustomTreeNode, Languages } from "./interfaces";
import { putTranslations } from "../../../services/static.service";
import { translationsFormat } from "../../../mocks/interfaces";

const useNodes = ( ) => {
    const { 
        pickedLang, 
        setUnsavedChanges,
        originalTranslations,
    } = useStore()
    // Displayed nodes
    const [ nodes, setNodes ] = useState<TreeNode[]>([]);
    const [ selectedNodeKey, setSelectedNodeKey ] = useState<string>();
    // Temporary nodes (lost on dismount)
    const [ spanishNodes, setSpanishNodes ] = useState<TreeNode[]>([])
    const [ englishNodes, setEnglishNodes ] = useState<TreeNode[]>([])

    const onSelect = (node:CustomTreeNode) => {
        const { isValue } = node
        setSelectedNodeKey(String(node.key))
    }

    const onUnselect = (event:any) => {
    }

    // @@@@@@@@@@@@@@@@@@@@@@@@@
    // @@This makes the initial load, so that the base languages work as a base value for our Spanish and English nodes
    // @@@@@@@@@@@@@@@@@@@@@@@@@
    const initialParse = ( target: Languages ) => {
        const targetIndex = target === 'es' ? 0 : 1
        const stringified = JSON.stringify(originalTranslations[targetIndex].content)
        const obj = JSON.parse(stringified)
        NodeService.getTreeTableNodes(obj).then(data => {
            if ( target === 'es'){
                setSpanishNodes(data)
            }
            if ( target === 'en'){
                setEnglishNodes(data)
            }
        });
    }
    useEffect(()=>{
            initialParse('en')
            initialParse('es')
    },[originalTranslations])
    // @@@@@@@@@@@@@@@@@@@@@@@@@
    // @@ ENDof initialLoad
    // @@@@@@@@@@@@@@@@@@@@@@@@@

    // @@@@@@@@@@@@@@@@@@@@@@@@@
    // @@ This is where language selection affects node tree
    // @@@@@@@@@@@@@@@@@@@@@@@@@
    const handleNodeSelection = ():TreeNode[] => {
        if ( pickedLang === 'es'){
            return spanishNodes
        }
        return englishNodes
    }
    useEffect(() => {
        setNodes(handleNodeSelection())
    }, [pickedLang, spanishNodes, englishNodes]); 
    // @@@@@@@@@@@@@@@@@@@@@@@@@
    // @ENDof language selection
    // @@@@@@@@@@@@@@@@@@@@@@@@@

    // @@@@@@@@@@@@@@@@@@@@@@@@@
    // @@Node edition
    // @@@@@@@@@@@@@@@@@@@@@@@@@
    const editNode = (options:any, value:string):void => {
        const result = updateNodeInTree(handleNodeSelection(), parseKeys(options.node.key),value,value)
        if ( pickedLang === 'es' ){
            setSpanishNodes(result)
        }
        if (pickedLang === 'en'){
            setEnglishNodes(result)
        }
    }
    // @@@@@@@@@@@@@@@@@@@@@@@@@
    // @@ENDof Node edition
    // @@@@@@@@@@@@@@@@@@@@@@@@@

    // @@@@@@@@@@@@@@@@@@@@@@@@@
    // @@ Visually displayed and editable node based on language
    // @@@@@@@@@@@@@@@@@@@@@@@@@
    useEffect(() => {
        if ( pickedLang === 'es' ){
            setNodes(spanishNodes)
        }
        if (pickedLang === 'en'){
            setNodes(englishNodes)
        }
    }, [spanishNodes, englishNodes, pickedLang]); 
    // @@@@@@@@@@@@@@@@@@@@@@@@@
    
    // @@ Finish functions (SUBMIT)


    const onSubmit = () => {
        const payload = formatForSubmit(spanishNodes, englishNodes)
        setUnsavedChanges(payload)
    }

    return { 
        nodes, selectedNodeKey,
        onSelect, onUnselect,
        setSelectedNodeKey, editNode,
        onSubmit,
    }
}
export default useNodes