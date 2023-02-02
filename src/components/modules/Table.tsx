import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { NodeService } from '../../services/modules/SearchTab.services';
import { accessObjectByKeyPath, parseKeys } from '../../services/shared/utilts.services';

export default function TemplateDoc() {
    const [nodes, setNodes] = useState<any[]>([]);
    const [selectedNodeKey, setSelectedNodeKey] = useState<string>();
    

    useEffect(() => {
        NodeService.getTreeTableNodes().then(data => setNodes(data));
    }, []); 
    
    const onSelect = (node:any) => {
        const key = node.key
        const value = node.data.name
        console.log(accessObjectByKeyPath(nodes, parseKeys(key)));
        if (node.isValue){
            console.log('aquio')
        }
    }

    const onUnselect = (event:any) => {
    }

    const header = 'Traducciones';
    const footer = (
        <div style={{ textAlign: 'left' }}>
            <Button icon="pi pi-refresh" tooltip="Reload" />
        </div>
    );

    return (
        <div>
            <div className="card">
                <TreeTable value={nodes} header={header} footer={footer} paginator rows={5} 
                selectionMode="single"  selectionKeys={selectedNodeKey} 
                onSelectionChange={(e) => setSelectedNodeKey(String(e.value))}
                onSelect={(event)=>onSelect(event.node)} onUnselect={onUnselect}
                >
                    <Column field="name" header="Name" expander></Column>
                </TreeTable>
            </div>
        </div>
    );
}