import React, { FC, HTMLAttributes } from 'react'

import { useSetAtom } from 'jotai'
import { BFSData, FieldModel } from 'state'

import { CharField } from './text'

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

        default:
            return <></>
    }
}

export * from './text'
export { FieldProps, RenderField }
