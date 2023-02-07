import TreeNode from "primereact/treenode";
import React, { useEffect, useState } from "react";
import { NodeService } from "../../../services/modules/SearchTab.services";
import { parseKeys, replaceValue } from "../../../services/shared/utilts.services";
import { CustomTreeNode, Languages } from "./interfaces";
import ES from '../../../locales/es/translationES.json'
import EN from '../../../locales/en/translationEN.json'
import useJSON from "./useJSON";
import { useStore } from "../../../store";

const useNodes = ( ) => {
    const { originalTranslations, loading } = useJSON()
    const { pickedLang } = useStore()
    const [selectedJSON, setSelectedJSON] = useState<Record<string,string>>()
    const [ nodes, setNodes ] = useState<TreeNode[]>([]);
    const [ selectedNodeKey, setSelectedNodeKey ] = useState<string>();
    const [ modifiedNodes, setModifiedNodes ] = useState<TreeNode[]>([])
    const [ activeNode, setActiveNode ] = useState<CustomTreeNode>()

    const onSelect = (node:CustomTreeNode) => {
        const { isValue } = node
        setSelectedNodeKey(String(node.key))
        if ( isValue ){
            setActiveNode(node as TreeNode)
        }
    }

    useEffect(()=>{
        if ( !loading ){
            console.info('finished loading')
            const filteredArray = originalTranslations.filter(element => element.lang_id === pickedLang);
            const { content } = filteredArray[0]
            setSelectedJSON(content)
        }

    },[loading, originalTranslations, setSelectedJSON, pickedLang])

    const onUnselect = (event:any) => {
    }

    const editNode = ( key:string,value?:string,  ) => {
        if ( value ){
            const obj = JSON.parse(JSON.stringify(selectedJSON));
            setSelectedJSON(replaceValue(parseKeys(key),obj,value))
        }
    }


    useEffect(() => {
        if ( selectedJSON ){
            const obj = JSON.parse(JSON.stringify(selectedJSON));
            NodeService.getTreeTableNodes(obj).then(data => {
                setNodes(data)
                setModifiedNodes(data)
            });
        }
    }, [selectedJSON]); 
    
    
    return { 
        nodes, selectedNodeKey, activeNode,
        selectedJSON,
        onSelect, onUnselect,
        setSelectedNodeKey, editNode
    }
}
export default useNodes