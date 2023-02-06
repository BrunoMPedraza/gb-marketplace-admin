import React, { useState } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';

import { Header } from './header';
import { InputTextEditor } from './edit';

import useBindings from './useBindings';
import useNodes from './useNodes';

export default function Table() {
    const [ globalFilter, setGlobalFilter ] = useState<string | null | undefined>(null);
    const { handleKeyBindings, focusSearchActive } = useBindings()
    const { 
        nodes, selectedNodeKey, activeNode, 
        editNode, selectedJSON,
        onSelect, onUnselect,
        setSelectedNodeKey
    } = useNodes()

    return (
            <TreeTable value={nodes} globalFilter={globalFilter} 
            header={
                <Header 
                globalFilter={globalFilter || ''} 
                setGlobalFilter={setGlobalFilter}
                isFocused={focusSearchActive}
                nodes={selectedJSON}
                />
            }
            onKeyDown={handleKeyBindings}
            paginator rows={5} 
            selectionMode="single"
            selectionKeys={selectedNodeKey} 
            onSelectionChange={(e) => setSelectedNodeKey(String(e.value))}
            onSelect={(event)=>onSelect(event.node)} 
            onUnselect={onUnselect}
            >
                <Column field="name" header="Name" 
                editor={
                    (options)=><InputTextEditor options={options} editNode={editNode}/>
                } 
                expander/>
            </TreeTable>
    );
}