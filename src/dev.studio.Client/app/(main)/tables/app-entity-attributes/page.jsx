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
import { Dropdown } from "primereact/dropdown";

export default function AppEntityAttributes () {

    const backendServiceUrl = `${process.env.app_protocol}://${process.env.app_host}:${process.env.app_port}/AppEntityAttribute`

    const [selectedRow, setSelectedRowState] = useState({})

    const [selectedRowIndex, setSelectedRowIndex] = useState(0)

    const [refreshTrigger, setRefreshTrigger] = useState(false)

    const [detailId, setDetailId] = useState('')
    const [detailCode, setDetailCode] = useState('')
    const [detailName, setDetailName] = useState('')
    const [detailAppDataType, setDetailAppDataType] = useState('')
    const [detailDescription, setDetailDescription] = useState('')
    const [detailAppEntity, setDetailAppEntity] = useState('')
    const [detailIsNullable, setDetailIsNullable] = useState(false)
    const [detailIsSearchable, setDetailIsSearchable] = useState(false)
    const [detailIsUnique, setDetailIsUnique] = useState(false)
    const [detailIsPrimaryKey, setDetailIsPrimaryKey] = useState(false)
    const [detailDbColumnName, setDetailDbColumnName] = useState('')
    const [detailDbColumnDefaultValue, setDetailDbColumnDefaultValue] = useState('')
    const [detailDbColumnLength, setDetailDbColumnLength] = useState(0)
    const [detailDbColumnPrecision, setDetailDbColumnPrecision] = useState(0)
    const [ExtReference, setExtReference] = useState('')


    const [appDataTypeOptions, setAppDataTypeOptions] = useState([])
    const [selectedAppDataType, setSelectedAppDataType] = useState(null)

    const [appEntityOptions, setAppEntityOptions] = useState([])
    const [selectedAppEntity, setSelectedAppEntity] = useState(null)

    const [extReferenceOptions, setExtReferenceOptions] = useState([])
    const [selectedExtReference, setSelectedExtReference] = useState(null)

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
                setDetailAppDataType(items[selectedRowIndex].appDataType)
                setDetailDescription(items[selectedRowIndex].description)
                setDetailAppEntity(items[selectedRowIndex].appEntity)
                setDetailIsNullable(items[selectedRowIndex].isNullable)
                setDetailIsSearchable(items[selectedRowIndex].isSearchable)
                setDetailIsUnique(items[selectedRowIndex].isUnique)
                setDetailIsPrimaryKey(items[selectedRowIndex].isPrimaryKey)
                setDetailDbColumnName(items[selectedRowIndex].dbColumnName)
                setDetailDbColumnDefaultValue(items[selectedRowIndex].dbColumnDefaultValue)
                setDetailDbColumnLength(items[selectedRowIndex].dbColumnLength)
                setDetailDbColumnPrecision(items[selectedRowIndex].dbColumnPrecision)
                setExtReference(items[selectedRowIndex].extReference)                

            }
            else {
                setSelectedRowState({
                    id: '',
                    code: '',
                    name: '',
                    appDataType: null,
                    description: '',
                    appEntity: null,
                    isNullable: false,
                    isSearchable: false,
                    isUnique: false,
                    isPrimaryKey: false,
                    dbColumnName: '',
                    dbColumnDefaultValue: '',
                    dbColumnLength: 0,
                    dbColumnPrecision: 0,
                    extReference: null
                })
                setDetailId('')
                setDetailCode('')
                setDetailName('')
                setDetailAppDataType(null)
                setDetailDescription('')
                setDetailAppEntity(null)
                setDetailIsNullable(false)
                setDetailIsSearchable(false)
                setDetailIsUnique(false)
                setDetailIsPrimaryKey(false)
                setDetailDbColumnName('')
                setDetailDbColumnDefaultValue('')
                setDetailDbColumnLength(0)
                setDetailDbColumnPrecision(0)
                setExtReference(null)

            }
        }

        async function fetchAppDataTypes () {
            let getAppDataTypesResponse = await fetch(`${process.env.app_protocol}://${process.env.app_host}:${process.env.app_port}/AppDataType`)
            let appDataTypes = await getAppDataTypesResponse.json()
            setAppDataTypeOptions(appDataTypes)
        }

        async function fetchAppEntities () {
            let getAppEntitiesResponse = await fetch(`${process.env.app_protocol}://${process.env.app_host}:${process.env.app_port}/AppEntity`)
            let appEntities = await getAppEntitiesResponse.json()
            setAppEntityOptions(appEntities)
        }

        async function fetchExtReferences () {
            let getExtReferencesResponse = await fetch(`${process.env.app_protocol}://${process.env.app_host}:${process.env.app_port}/AppEntityAttribute`)
            let extReferences = await getExtReferencesResponse.json()
            setExtReferenceOptions(extReferences)
        }

        fetchItems()
        fetchAppDataTypes()
        fetchAppEntities()
        fetchExtReferences()

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
                    setDetailAppDataType(null)
                    setDetailDescription('')
                    setDetailAppEntity(null)
                    setDetailIsNullable(false)
                    setDetailIsSearchable(false)
                    setDetailIsUnique(false)
                    setDetailIsPrimaryKey(false)
                    setDetailDbColumnName('')
                    setDetailDbColumnDefaultValue('')
                    setDetailDbColumnLength(0)
                    setDetailDbColumnPrecision(0)
                    setExtReference(null)                                       
                    
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
                    setDetailAppDataType(null)
                    setDetailDescription('')
                    setDetailAppEntity(null)
                    setDetailIsNullable(false)
                    setDetailIsSearchable(false)
                    setDetailIsUnique(false)
                    setDetailIsPrimaryKey(false)
                    setDetailDbColumnName('')
                    setDetailDbColumnDefaultValue('')
                    setDetailDbColumnLength(0)
                    setDetailDbColumnPrecision(0)
                    setExtReference(null)

                    setIsFormUpdated(false)
                    setRefreshTrigger(!refreshTrigger)
                }
            }} />
        </div>
    )

    return (
        <div>
            <h1>AppEntityAttributes</h1>
            <p>This is the AppEntityAttributes page.</p>
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
                                    setDetailAppDataType(e.value.appDataType)
                                    setDetailDescription(e.value.description)
                                    setDetailAppEntity(e.value.appEntity)
                                    setDetailIsNullable(e.value.isNullable)
                                    setDetailIsSearchable(e.value.isSearchable)
                                    setDetailIsUnique(e.value.isUnique)
                                    setDetailIsPrimaryKey(e.value.isPrimaryKey)
                                    setDetailDbColumnName(e.value.dbColumnName)
                                    setDetailDbColumnDefaultValue(e.value.dbColumnDefaultValue)
                                    setDetailDbColumnLength(e.value.dbColumnLength)
                                    setDetailDbColumnPrecision(e.value.dbColumnPrecision)
                                    setExtReference(e.value.extReference)                                    
                                }
                            }
                            }
                            dataKey="id"
                        >
                            <Column field="id" header="Id" sortable></Column>
                            <Column field="code" header="Code" sortable></Column>
                            <Column field="name" header="Name" sortable></Column>
                            <Column field="appDataType" header="AppDataType" sortable></Column>
                            <Column field="description" header="Description" sortable></Column>
                            <Column field="appEntity" header="AppEntity" sortable></Column>
                            <Column field="isNullable" header="IsNullable" sortable></Column>
                            <Column field="isSearchable" header="IsSearchable" sortable></Column>
                            <Column field="isUnique" header="IsUnique" sortable></Column>
                            <Column field="isPrimaryKey" header="IsPrimaryKey" sortable></Column>
                            <Column field="dbColumnName" header="DbColumnName" sortable></Column>
                            <Column field="dbColumnDefaultValue" header="DbColumnDefaultValue" sortable></Column>
                            <Column field="dbColumnLength" header="DbColumnLength" sortable></Column>
                            <Column field="dbColumnPrecision" header="DbColumnPrecision" sortable></Column>
                            <Column field="extReference" header="ExtReference" sortable></Column>

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
                                id="description"
                                value={detailDescription}
                                onChange={(e) => {
                                    setDetailDescription(e.target.value)
                                    setIsFormUpdated(true);
                                }
                                }   
                            ></InputText>   
                            <label htmlFor="description">Description</label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputText
                                id="dbColumnName"
                                value={detailDbColumnName}
                                onChange={(e) => {
                                    setDetailDbColumnName(e.target.value)
                                    setIsFormUpdated(true);
                                }
                                }
                            ></InputText>
                            <label htmlFor="dbColumnName">DbColumnName</label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputText
                                id="dbColumnDefaultValue"
                                value={detailDbColumnDefaultValue}
                                onChange={(e) => {
                                    setDetailDbColumnDefaultValue(e.target.value)
                                    setIsFormUpdated(true);
                                }
                                }
                            ></InputText>
                            <label htmlFor="dbColumnDefaultValue">DbColumnDefaultValue</label>
                        </FloatLabel>

                        <FloatLabel>
                            <InputText
                                id="dbColumnLength"
                                value={detailDbColumnLength}
                                onChange={(e) => {
                                    setDetailDbColumnLength(e.target.value)
                                    setIsFormUpdated(true);
                                }
                                }
                            ></InputText>
                            <label htmlFor="dbColumnLength">DbColumnLength</label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputText
                                id="dbColumnPrecision"
                                value={detailDbColumnPrecision}
                                onChange={(e) => {
                                    setDetailDbColumnPrecision(e.target.value)
                                    setIsFormUpdated(true);
                                }
                                }
                            ></InputText>
                            <label htmlFor="dbColumnPrecision">DbColumnPrecision</label>
                        </FloatLabel>
                        <Dropdown value={selectedAppDataType} options={appDataTypeOptions} onChange={(e) => {
                            setSelectedAppDataType(e.value)
                            setDetailAppDataType(e.value)
                            setIsFormUpdated(true)
                        }
                        } optionLabel="name" placeholder="Select a AppDataType" />
                        <Dropdown value={selectedAppEntity} options={appEntityOptions} onChange={(e) => {
                            setSelectedAppEntity(e.value)
                            setDetailAppEntity(e.value)
                            setIsFormUpdated(true)
                        }
                        } optionLabel="name" placeholder="Select a AppEntity" />
                        <Dropdown value={selectedExtReference} options={extReferenceOptions} onChange={(e) => {
                            setSelectedExtReference(e.value)
                            setExtReference(e.value)
                            setIsFormUpdated(true)
                        }
                        } optionLabel="name" placeholder="Select a ExtReference" />

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
                                        AppDataTypeId: detailAppDataType.id,
                                        Description: detailDescription,
                                        AppEntityId: detailAppEntity.id,
                                        IsNullable: detailIsNullable,
                                        IsSearchable: detailIsSearchable,
                                        IsUnique: detailIsUnique,
                                        IsPrimaryKey: detailIsPrimaryKey,
                                        DbColumnName: detailDbColumnName,
                                        DbColumnDefaultValue: detailDbColumnDefaultValue,
                                        DbColumnLength: detailDbColumnLength,
                                        DbColumnPrecision: detailDbColumnPrecision,
                                        ExtReferenceId: ExtReference.id
                                    })
                                })

                                const updatedItem = await updatedItemResponse.json()

                                setItemList((itemList) => [...itemList, updatedItem])

                                setSelectedRowState(updatedItem)
                                setIsFormUpdated(false)
                            }
                        }}
                        ></Button>
                        {isFormUpdated &&
                            <Button label="Cancel" onClick={() => {
                                setDetailId(selectedRow.Id)
                                setDetailCode(selectedRow.Code)
                                setDetailName(selectedRow.Name)
                                setDetailAppDataType(selectedRow.AppDataType)
                                setDetailDescription(selectedRow.Description)
                                setDetailAppEntity(selectedRow.AppEntity)
                                setDetailIsNullable(selectedRow.IsNullable)
                                setDetailIsSearchable(selectedRow.IsSearchable)
                                setDetailIsUnique(selectedRow.IsUnique)
                                setDetailIsPrimaryKey(selectedRow.IsPrimaryKey)
                                setDetailDbColumnName(selectedRow.DbColumnName)
                                setDetailDbColumnDefaultValue(selectedRow.DbColumnDefaultValue)
                                setDetailDbColumnLength(selectedRow.DbColumnLength)
                                setDetailDbColumnPrecision(selectedRow.DbColumnPrecision)
                                setExtReference(selectedRow.ExtReference)

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
