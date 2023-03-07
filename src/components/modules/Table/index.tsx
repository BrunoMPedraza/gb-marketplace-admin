import React, { useState } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';

import { Header } from './header';
import Footer from './footer';
import { InputTextEditor } from './edit';

import useBindings from './useBindings';
import useNodes from './useNodes';
import useJSON from './useJSON';

export default function Table() {
    const [ globalFilter, setGlobalFilter ] = useState<string | null | undefined>(null);
    const { handleKeyBindings, focusSearchActive } = useBindings()
    const { loading } = useJSON()
    const { 
        nodes, selectedNodeKey, 
        addNode,
        editNode,
        onSelect,
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
                addNode={addNode}
                globalFilter={globalFilter || ''} 
                selectedNodeKey={String(selectedNodeKey)}
                setGlobalFilter={setGlobalFilter}
                isFocused={focusSearchActive}
                nodes={nodes}
                />
            }
            footer={<Footer onSubmit={onSubmit}/>
            }
            onKeyDown={handleKeyBindings}
            paginator rows={8}
            selectionMode="single"
            selectionKeys={selectedNodeKey} 
            onSelectionChange={({value})=>setSelectedNodeKey(String(value))}
            onSelect={({node})=>onSelect(node)} 
            >
                <Column 
                field="name" header="Name" 
                editor={
                    (options)=>
                    <InputTextEditor 
                    addNewChain={addNode} 
                    editNode={editNode}
                    options={options} 
                    />
                } 
                expander/>
            </TreeTable>
    );
}