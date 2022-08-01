import React, { FC, HTMLAttributes, ReactNode } from 'react'

import { useSetAtom } from 'jotai'
import { BFSData, FieldModel } from 'state'

import { ImageField } from './files'
import { BooleanField } from './number'
import { ForeignKeyField } from './related'
import { CharField, TextField } from './text'

// TF as Field Type or Type Field
interface FieldProps<TF> extends HTMLAttributes<HTMLElement> {
    change: (v: string | Blob) => void
    field: TF
}

type TRenderField = FC<Omit<FieldProps<FieldModel>, 'change'>>
const RenderField: TRenderField = ({ field, ...attr }) => {
    const UpdateData = useSetAtom(BFSData)

    const U = (v: string | Blob) => UpdateData({ [`F_${field.name}`]: v })

    const props = { ...attr, change: (v: string | Blob) => U(v) }

    switch (field.type) {
        case 'char':
            return <CharField field={field} {...props} />

        case 'text':
            return <TextField field={field} {...props} />

        case 'boolean':
            return <BooleanField field={field} {...props} />

        case 'foreign_key':
            return <ForeignKeyField field={field} {...props} />

        case 'image':
            return <ImageField field={field} {...props} />

        default:
            return <></>
    }
}

interface SelectProps<choice> extends HTMLAttributes<HTMLSelectElement> {
    choices: choice[]
    get_label: (c: choice, i: number) => ReactNode
    get_value: (c: choice, i: number) => string | number
}

function ChoicesField<choice>(props: SelectProps<choice>) {
    const { choices, get_label, get_value, ...attr } = props

    return (
        <select {...attr}>
            {choices.map((c, i) => (
                <option key={i} value={get_value(c, i)}>
                    {get_label(c, i)}
                </option>
            ))}
        </select>
    )
}

export * from './text'
export { FieldProps, RenderField, ChoicesField }
