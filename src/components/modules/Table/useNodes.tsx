import TreeNode from "primereact/treenode";
import React, { useEffect, useState } from "react";
import { NodeService } from "../../../services/modules/SearchTab.services";
import { parseKeys, replaceValue } from "../../../services/shared/utilts.services";
import { CustomTreeNode } from "./interfaces";
import ES from '../../../locales/es/translationES.json'

const useNodes = ( ) => {
    const [selectedJSON, setSelectedJSON] = useState(ES)
    const [ nodes, setNodes ] = useState<TreeNode[]>([]);
    const [ selectedNodeKey, setSelectedNodeKey ] = useState<string>();
    const [ modifiedNodes, setModifiedNodes ] = useState<TreeNode[]>([])
    const [ activeNode, setActiveNode ] = useState<CustomTreeNode>()
    const obj = JSON.parse(JSON.stringify(selectedJSON));
    
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
            setSelectedJSON(replaceValue(parseKeys(key),obj,value))
        }
    }


    useEffect(() => {
        const obj = JSON.parse(JSON.stringify(selectedJSON));
        NodeService.getTreeTableNodes(obj).then(data => {
            setNodes(data)
            setModifiedNodes(data)
        });
    }, [selectedJSON]); 
    
    
    return { 
        nodes, selectedNodeKey, activeNode,
        selectedJSON,
        onSelect, onUnselect,
        setSelectedNodeKey, editNode
    }
}
export default useNodes