import TreeNode from "primereact/treenode";
import React, { useEffect, useState } from "react";
import { NodeService } from "../../../services/modules/SearchTab.services";
import { parseKeys, replaceValue } from "../../../services/shared/utilts.services";
import { useStore } from "../../../store";
import { CustomTreeNode } from "./interfaces";
import useJSON from "./useJSON";

const useNodes = ( ) => {
    const { pickedLang } = useStore()
    const { content } = useJSON()
    const { unsavedChanges, setUnsavedChanges, clearUnsaved} = useStore()
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


    const onUnselect = (event:any) => {
    }

    const editNode = ( key:string,value?:string,  ) => {
        if ( value ){
            const obj = JSON.parse(JSON.stringify(selectedJSON));
            setSelectedJSON(replaceValue(parseKeys(key),obj,value))
        }
    }

    useEffect(()=>{
        if ( content === selectedJSON){
            clearUnsaved()
        }
        if ( content !== selectedJSON && selectedJSON){
            setUnsavedChanges(pickedLang,selectedJSON)
        }
    },[content, selectedJSON])

    useEffect(()=>{
        setSelectedJSON(content)
    },[content])

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