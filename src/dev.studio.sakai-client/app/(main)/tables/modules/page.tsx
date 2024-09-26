import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { Splitter, SplitterPanel } from "primereact/splitter"
import { useState } from 'react';

const [selectedRow, setSelectedRowState] = useState({})

export default function Modules() {
return (
    <div>
        <h1>Modules</h1>
        <p>This is the Modules page.</p>
        <Splitter style={{ height: '100%' }}>
            <SplitterPanel 
                size={30} 
                minSize={10} 
                style={{ overflow: 'auto' }}>                
                <div>
                    <DataTable 
                        value={[{
                            Id: 1,
                            Code: 'Code 1',
                            Name: 'Name 1',
                            SchemaName: 'Schema Name 1',
                            OltpModuleName: 'Oltp Module Name 1'
                        }, {
                            Id: 2,
                            Code: 'Code 2',
                            Name: 'Name 2',
                            SchemaName: 'Schema Name 2',
                            OltpModuleName: 'Oltp Module Name 2'
                        }, {
                            Id: 3,
                            Code: 'Code 3',
                            Name: 'Name 3',
                            SchemaName: 'Schema Name 3',
                            OltpModuleName: 'Oltp Module Name 3'
                        }]}
                        stripedRows
                        showGridlines
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 20, 50]}
                        sortMode="multiple"

                        selectionMode="single"
                        selection={selectedRow}
                        onSelectionChange={(e) => setSelectedRowState(e.value)}
                        dataKey="Id"
                        >
                        <Column field="Id" header="Id" sortable></Column>
                        <Column field="Code" header="Code" sortable></Column>
                        <Column field="Name" header="Name" sortable></Column>
                        <Column field="SchemaName" header="Schema Name" sortable></Column>
                        <Column field="OltpModuleName" header="Oltp Module Name" sortable></Column>
                    </DataTable>
                </div>
            </SplitterPanel>
            <SplitterPanel 
                style={{ overflow: 'auto' }}
                minSize={10}
                >
                <div>Right Panel</div>
            </SplitterPanel>
        </Splitter>
    </div>
)
}   
