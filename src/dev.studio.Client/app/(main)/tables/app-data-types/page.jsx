'use client'
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { Splitter, SplitterPanel } from "primereact/splitter"
import { useEffect, useState } from 'react';
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import { Toolbar } from "primereact/toolbar";

export default function AppDataTypes () {

    const backendServiceUrl = `${process.env.app_protocol}://${process.env.app_host}:${process.env.app_port}/AppDataType`

    const [selectedRow, setSelectedRowState] = useState({})

    const [selectedRowIndex, setSelectedRowIndex] = useState(0)

    const [refreshTrigger, setRefreshTrigger] = useState(false)

    const [detailId, setDetailId] = useState('')
    const [detailCode, setDetailCode] = useState('')
    const [detailName, setDetailName] = useState('')
    const [detailPgType, setDetailPgType] = useState('')    

    const [isFormUpdated, setIsFormUpdated] = useState(false)

    const [itemList, setItemList] = useState([{}])

    useEffect(() => {
        async function fetchItems () {
            let getItemsResponse = await fetch(backendServiceUrl)

            console.log("getItemsResponse", getItemsResponse)

            let items = await getItemsResponse.json()

            console.log("items", items)

            setItemList(items)

            if (items !== null && items.length > 0 && selectedRowIndex < items.length) {

                console.log('set init selected row state')

                setSelectedRowState(items[selectedRowIndex])
                setDetailId(items[selectedRowIndex].id)
                setDetailCode(items[selectedRowIndex].code)
                setDetailName(items[selectedRowIndex].name)
                setDetailPgType(items[selectedRowIndex].pgType)
            }
            else {
                setSelectedRowState({
                    id: '',
                    code: '',
                    name: '',
                    pgType: '',
                })
                setDetailId('')
                setDetailCode('')
                setDetailName('')
                setDetailPgType('')
            }
        }
        fetchItems()

    }, [])

    if (!itemList) return <div>Loading...</div>

    const detailToolbarStart = (
        <div className="flex gap-2 p-toolbar-group-left">
            <Button
                label="New"
                icon="pi pi-plus"
                onClick={() => {
                    setDetailId('')
                    setDetailCode('')
                    setDetailName('')
                    setDetailPgType('')
                    setIsFormUpdated(true)
                }}
            />
            {/* <Button label="Edit" icon="pi pi-pencil" /> */}
            <Button label="Delete" icon="pi pi-trash" onClick={async () => {
                if (detailId !== '') {
                    const deleteResponse = await fetch(`${backendServiceUrl}/${detailId}`, {
                        method: 'DELETE'
                    })
                    let rowIndex = selectedRowIndex
                    // Set to next item in list
                    if (rowIndex < itemList.length - 1) {
                        rowIndex++
                        setSelectedRowState(itemList[rowIndex])
                    } else {
                        if (index > 0) {
                            rowIndex--
                            setSelectedRowState(itemList[rowIndex])
                        }
                    }
                    setSelectedRowIndex(rowIndex)

                    setDetailId('')
                    setDetailCode('')
                    setDetailName('')
                    setDetailPgType('')
                    setIsFormUpdated(false)
                    setRefreshTrigger(!refreshTrigger)
                }
            }} />
        </div>
    )

    return (
        <div>
            <h1>AppDataTypes</h1>
            <p>This is the AppDataTypes page.</p>
            <Splitter style={{ height: '100%' }}>
                <SplitterPanel
                    size={30}
                    minSize={10}
                    style={{ overflow: 'auto' }}>
                    <div>
                        <Toolbar start={detailToolbarStart}>
                        </Toolbar>
                        <DataTable
                            value={itemList}
                            stripedRows
                            showGridlines
                            paginator
                            rows={10}
                            rowsPerPageOptions={[5, 10, 20, 50]}
                            sortMode="multiple"

                            selectionMode="single"
                            selection={selectedRow}
                            onSelectionChange={(e) => {
                                if (e.value !== null) {
                                    setSelectedRowState(e.value)
                                    setSelectedRowIndex(() => itemList.findIndex(item => item.id === e.value.id))
                                    setDetailId(e.value.id)
                                    setDetailCode(e.value.code)
                                    setDetailName(e.value.name)
                                    setDetailPgType(e.value.pgType)
                                }
                            }
                            }
                            dataKey="id"
                        >
                            <Column field="id" header="Id" sortable></Column>
                            <Column field="code" header="Code" sortable></Column>
                            <Column field="name" header="Name" sortable></Column>
                            <Column field="pgType" header="PG SQL Type" sortable></Column>
                        </DataTable>
                    </div>
                </SplitterPanel>
                <SplitterPanel
                    style={{ overflow: 'auto' }}
                    minSize={10}
                >
                    <div className="flex card flex-column gap-4">
                        <FloatLabel>
                            <InputText readOnly={true}
                                id="id"
                                value={detailId}
                            ></InputText>
                            <label htmlFor="id">Id</label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputText
                                id="code"
                                value={detailCode}
                                onChange={(e) => {
                                    setDetailCode(e.target.value)
                                    setIsFormUpdated(true);
                                }
                                }
                            ></InputText>
                            <label htmlFor="code">Code</label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputText
                                id="name"
                                value={detailName}
                                onChange={(e) => {
                                    setDetailName(e.target.value)
                                    setIsFormUpdated(true);
                                }
                                }
                            ></InputText>
                            <label htmlFor="name">Name</label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputText
                                id="pgType"
                                value={detailPgType}
                                onChange={(e) => {
                                    setDetailPgType(e.target.value)
                                    setIsFormUpdated(true);
                                }
                                }
                            ></InputText>
                            <label htmlFor="pgType">PG SQL Type</label>
                        </FloatLabel>

                        <Button label="OK" onClick={async () => {
                            if (isFormUpdated) {
                                let methodName = 'POST'
                                let queryUrl = backendServiceUrl
                                if (detailId !== '') {
                                    methodName = 'PUT'
                                    queryUrl = `${backendServiceUrl}/${detailId}`
                                }
                                const updatedItemResponse = await fetch(queryUrl, {
                                    method: methodName,
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        Id: detailId === '' ? 0 : detailId,
                                        Code: detailCode,
                                        Name: detailName,
                                        PgType: detailPgType,                                        
                                    })
                                })

                                const updatedItem = await updatedItemResponse.json()

                                setItemList((itemList) => [...itemList, updatedItem])

                                setSelectedRowState(updatedItem)
                            }
                        }}
                        ></Button>
                        {isFormUpdated &&
                            <Button label="Cancel" onClick={() => {
                                setDetailId(selectedRow.Id)
                                setDetailCode(selectedRow.Code)
                                setDetailName(selectedRow.Name)
                                setDetailPgType(selectedRow.pgType)
                                setIsFormUpdated(false)
                            }}></Button>
                        }
                        <Panel header="Details">
                            {/* <p className="m-0">isFormUpdated={isFormUpdated.toString()}</p>
                            <p>process.env.app_host={process.env.app_host.toString()}</p> */}
                        </Panel>

                    </div>
                </SplitterPanel>
            </Splitter>
        </div>
    )
}   
