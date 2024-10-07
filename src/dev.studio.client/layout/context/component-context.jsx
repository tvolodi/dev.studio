'use client'

import React from 'react'

import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { JsonEditor } from "json-edit-react";
import { InputTextFloatLabel } from "../../app/components/input-text-float-label";


export const ComponentContext = React.createContext()

export const ComponentProvider = ({ children }) => {
    const [components, setComponents] = React.useState({
        "FloatLabel": FloatLabel,
        "InputText": InputText,
        "InputTextFloatLabel": InputTextFloatLabel,
        "JsonEditor": JsonEditor,
    })


    
    return (
        <ComponentContext.Provider value={{ components, setComponents }}>
        {children}
        </ComponentContext.Provider>
    )
    }