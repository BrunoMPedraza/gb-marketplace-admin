import React, { useEffect, useState } from "react";
import TreeNode from "primereact/treenode";
import {formatForSubmit, NodeService, updateNodeInTree, updateTranslation } from "../../../services/modules/SearchTab.services";
import { parseKeys } from "../../../services/shared/utilts.services";
import { useStore } from "../../../store";
import { CustomTreeNode, Languages, newLangValues } from "./interfaces";

const useNodes = ( ) => {
    const { 
        pickedLang, 
        setUnsavedChanges,
        originalTranslations,
        setOriginalTranslations
    } = useStore()
    // Displayed nodes
    const [ nodes, setNodes ] = useState<TreeNode[]>([]);
    const [ selectedNodeKey, setSelectedNodeKey ] = useState<string>();
    // Temporary nodes (lost on dismount)
    const [ spanishNodes, setSpanishNodes ] = useState<TreeNode[]>([])
    const [ englishNodes, setEnglishNodes ] = useState<TreeNode[]>([])
    useEffect(()=>{
        console.log(originalTranslations)
        console.log(originalTranslations[0].content,selectedNodeKey,)
    },[originalTranslations])
    const onSelect = (node:CustomTreeNode) => {
        const { key } = node
        setSelectedNodeKey(String(key))
    }

    const onUnselect = (node:CustomTreeNode) => {
        setSelectedNodeKey(undefined)
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
    // @@This allows us to manage new nodes and folders.
    // @@@@@@@@@@@@@@@@@@@@@@@@@
    const addNode = ({ esValue, enValue }: newLangValues,newKey:string, ) => {
        const parsedNode = selectedNodeKey ? `${selectedNodeKey}-${newKey}` : newKey
        const updatedContentEn = updateTranslation(originalTranslations, parsedNode, enValue, 'en');
        const updatedContentEs = updateTranslation(originalTranslations, parsedNode, esValue, 'es');
        const result = updatedContentEn.map((node, i) => ({
            ...node,
            content: {
              ...node.content,
              ...updatedContentEs[i].content
            }
          }))
        setOriginalTranslations(result)
    }
    // @@@@@@@@@@@@@@@@@@@@@@@@@
    // @@ENDof Node edition
    // @@@@@@@@@@@@@@@@@@@@@@@@@

    // @@@@@@@@@@@@@@@@@@@@@@@@@
    // @@ Visually displayed and editable node based on language
    // @@@@@@@@@@@@@@@@@@@@@@@@@
    useEffect(() => {
        console.log(spanishNodes)
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
        console.log(payload)
    }

    return { 
        nodes, selectedNodeKey, 
        addNode,
        editNode,
        onSelect,
        setSelectedNodeKey,
        onSubmit
    }
}
export default useNodes