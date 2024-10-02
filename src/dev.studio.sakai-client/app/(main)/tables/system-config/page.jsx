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
import { JsonEditor } from "json-edit-react";
import fetchRest from "../../../api/fetch-rest"

const backendServiceUrl = `${process.env.app_protocol}://${process.env.app_host}:${process.env.app_port}/SystemConfig`

const entityModel = {
    id: {},
    code: {},
    name: {},
    simpleValue: {},
    value: {},
}


export default function SystemConfig () {

    const [selectedRow, setSelectedRowState] = useState({})
    const [selectedRowIndex, setSelectedRowIndex] = useState(0)

    const updatedEntity = {}

    const [refreshTrigger, setRefreshTrigger] = useState(false)

    const detailEntityData = {}    
    const setDetailEntityData = {}

    for (const field in entityModel) {
        if(typeof entityModel[field] === 'object') {
            [detailEntityData[field], setDetailEntityData[field]] = useState({})
        } else {            
            [detailEntityData[field], setDetailEntityData[field]] = useState('') 
        }
    }

    const [detailId, setDetailId] = useState('')
    const [detailCode, setDetailCode] = useState('')
    const [detailName, setDetailName] = useState('')
    const [detailSimpleValue, setDetailSimpleValue] = useState('')
    const [detailValue, setDetailValue] = useState({})

    updatedEntity.id = detailId
    updatedEntity.code = detailCode
    updatedEntity.name = detailName
    updatedEntity.simpleValue = detailSimpleValue
    updatedEntity.value = detailValue

    const [isFormUpdated, setIsFormUpdated] = useState(false)

    const [itemList, setItemList] = useState([{}])

    useEffect(() => {
        async function fetchItems () {
            let items = await fetchRest.getEntities(backendServiceUrl)

            setItemList(items)

            if (items !== null && items.length > 0 && selectedRowIndex < items.length) {
                setSelectedRowState(items[selectedRowIndex])
                setDetailId(items[selectedRowIndex].id)
                setDetailCode(items[selectedRowIndex].code)
                setDetailName(items[selectedRowIndex].name)
                setDetailSimpleValue(items[selectedRowIndex].simpleValue)
                setDetailValue(items[selectedRowIndex].value)
            }
            else {
                setSelectedRowState({
                    id: '',
                    code: '',
                    name: '',
                    simpleValue: '',
                    value: {}
                })
                setDetailId('')
                setDetailCode('')
                setDetailName('')
                setDetailSimpleValue('')
                setDetailValue({})
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
                    setDetailSimpleValue('')
                    setDetailValue({})
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
                    setDetailSimpleValue('')
                    setDetailValue({})

                    setIsFormUpdated(false)
                    setRefreshTrigger(!refreshTrigger)
                }
            }} />
        </div>
    )

    return (
        <div>
            <h1>SystemConfig</h1>
            <p>This is the SystemConfig page.</p>
            <Splitter style={{ height: '100%' }}>
                <SplitterPanel
                    size={30}
                    minSize={10}
                    style={{ overflow: 'auto' }}>
                    <div>
                        <Toolbar start={detailToolbarStart}>
                        </Toolbar>
                        <div className="card">
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
                                    setDetailSimpleValue(e.value.simpleValue)
                                    setDetailValue(e.value.value)
                                }
                            }
                            }
                            dataKey="id"
                        >
                            {
                                Object.keys(entityModel).map((field) => {
                                    return <Column 
                                                field={field} 
                                                header={field.split(/(?=[A-Z])/).map(s=>{
                                                    let s1 = s.toLowerCase()
                                                    s1 = s1.charAt(0).toUpperCase() + s1.slice(1)
                                                    return s1
                                                }).join(' ')} 
                                                sortable
                                                >
                                                
                                            </Column>
                                }
                            )
                            }
                        </DataTable>
                        </div>
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
                                id="simpleValue"
                                value={detailSimpleValue}
                                onChange={(e) => {
                                    setDetailSimpleValue(e.target.value)
                                    setIsFormUpdated(true);
                                }
                                }
                            ></InputText>
                            <label htmlFor="simpleValue">Simple Value</label>
                        </FloatLabel>

                        <JsonEditor
                            id="value"
                            data={detailValue}
                            setData={setDetailValue}
                            onUpdate={() => {
                                setIsFormUpdated(true);
                            }
                        }
                        />
                        <Button label="OK" onClick={async () => {
                            if (isFormUpdated) {
                                let updatedItem;
                                if (detailId !== '') {
                                    updatedItem = await fetchRest.updatedEntityEntity(backendServiceUrl, updatedEntity)
                                } else {
                                    updatedItem = await fetchRest.createEntity(backendServiceUrl, updatedEntity)
                                }                            

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
                                setDetailSimpleValue(selectedRow.SimpleValue)
                                setDetailValue(selectedRow.Value)
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
