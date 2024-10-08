'use client'

import React from 'react'

import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";

export const InputTextFloatLabel = 
({ 
    fieldName = '', 
    fieldLabel = '', 
    isHidden = false, 
    isReadonly = false, 
    value = '',
    formData = {},
    setFormData,
    onChange,
}) => {
    return (
        <FloatLabel hidden={isHidden}>
            <InputText
                id={fieldName}
                value={formData[fieldName] || value}
                name={fieldName}
                onChange={(e) => {
                    if (onChange) {
                        onChange(e.target.value)
                    } else {
                        setFormData({ ...formData, [e.target.name]: e.target.value })
                }}}
                readOnly={isReadonly}
            ></InputText>
            <label htmlFor={fieldName}>{fieldLabel}</label>
        </FloatLabel>
    )
}
