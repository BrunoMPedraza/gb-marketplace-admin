import React, { useState } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';

import { Header } from './header';
import { InputTextEditor } from './edit';

import useBindings from './useBindings';
import useNodes from './useNodes';
import useJSON from './useJSON';
import { InputText } from 'primereact/inputtext';

export default function Table() {
    const [ globalFilter, setGlobalFilter ] = useState<string | null | undefined>(null);
    const { handleKeyBindings, focusSearchActive } = useBindings()
    const { loading } = useJSON()
    const { 
        nodes, selectedNodeKey, 
        editNode, 
        onSelect, onUnselect,
        setSelectedNodeKey,
        onSubmit
    } = useNodes()

    if ( loading ){
        return <>loadingggg</>
    }

    return (
            <TreeTable value={nodes} globalFilter={globalFilter} 
            header={
                <Header 
                globalFilter={globalFilter || ''} 
                setGlobalFilter={setGlobalFilter}
                isFocused={focusSearchActive}
                nodes={nodes}
                onSubmit={onSubmit}
                />
            }
            onKeyDown={handleKeyBindings}
            paginator rows={8}
            selectionMode="single"
            selectionKeys={selectedNodeKey} 
            onSelectionChange={({value}) => setSelectedNodeKey(String(value))}
            onSelect={({node})=>onSelect(node)} 
            onUnselect={onUnselect}
            >
                <Column 
                field="name" header="Name" 
                editor={
                    (options)=><InputTextEditor options={options} editNode={editNode}/>
                } 
                expander/>
            </TreeTable>
    );
}