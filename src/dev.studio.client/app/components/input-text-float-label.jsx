'use client'

import React from 'react'

import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";

export const InputTextFloatLabel = ({ fieldName, fieldLabel, isHidden, value, onChange }) => {
    return (
        <FloatLabel hidden={isHidden}>
            <InputText
                id={fieldName}
                value={value}
                onChange={(e) => {
                    if (onChange) {
                        onChange(e.target.value)
                    }
                }
            }
            ></InputText>
            <label htmlFor={fieldName}>{fieldLabel}</label>
        </FloatLabel>
    )
}
