
import React, { useEffect, useState } from 'react';
import { TreeSelect, TreeSelectChangeParams } from 'primereact/treeselect';
import { NodeService } from '../../services/modules/SearchTab.services';

export const SearchTab = () => {
    const [nodes, setNodes] = useState<any[]>();
    const [selectedNodeKeys, setSelectedNodeKeys] = useState<any>(null);
    
    useEffect(() => {
        NodeService.getTreeNodes().then((data) => setNodes(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    return(
        <TreeSelect 
        filter  
        value={selectedNodeKeys} 
        options={nodes} 
        onChange={(e : TreeSelectChangeParams) => setSelectedNodeKeys(e.value)} 
        selectionMode="single" 
        className="md:w-20rem w-full" 
        placeholder="Select Items"/>
    )
}