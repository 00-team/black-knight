import React, { FC } from 'react'

import { useSetAtom } from 'jotai'
import { BFSData, FieldModel } from 'state'

import { DateField, DateTimeField, TimeField } from './datetime'
import { FileField, ImageField } from './files'
import { BooleanField, DecimalField, FloatField, IntegerField } from './number'
import { ReadOnlyField, UnknonwField } from './others'
import { ForeignKeyField } from './related'
import { FieldProps } from './shared'
import { CharField, JsonField, TextField } from './text'

type TRenderField = FC<Omit<FieldProps<FieldModel>, 'change'>>
const RenderField: TRenderField = ({ field, ...attr }) => {
    const UpdateData = useSetAtom(BFSData)

    const U = (v: string | Blob) => UpdateData({ [`F_${field.name}`]: v })

    const props = { ...attr, change: (v: string | Blob) => U(v) }

    switch (field.type) {
        // ================ TEXT ================
        case 'char':
            return <CharField field={field} {...props} />

        case 'text':
            return <TextField field={field} {...props} />

        case 'json':
            return <JsonField field={field} {...props} />

        // ================ NUMB ================

        case 'boolean':
            return <BooleanField field={field} {...props} />

        case 'integer':
            return <IntegerField field={field} {...props} />

        case 'decimal':
            return <DecimalField field={field} {...props} />

        case 'float':
            return <FloatField field={field} {...props} />

        // ================ RELA ================

        case 'foreign_key':
            return <ForeignKeyField field={field} {...props} />

        // ================ FILE ================

        case 'image':
            return <ImageField field={field} {...props} />

        case 'file':
            return <FileField field={field} {...props} />

        // ================ DATE ================

        case 'date':
            return <DateField field={field} {...props} />

        case 'datetime':
            return <DateTimeField field={field} {...props} />

        case 'time':
            return <TimeField field={field} {...props} />

        // ================ OTHE ================

        case 'readonly':
            return <ReadOnlyField field={field} {...attr} />

        case 'unknown':
            return <UnknonwField field={field} {...attr} />

        default:
            return <></>
    }
}

export { RenderField }
