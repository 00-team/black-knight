import React, { FC } from 'react'

import { ChoicesField, FieldProps } from '.'

import { ForeignKeyFieldModel } from 'state'

type TForeignKey = FC<FieldProps<ForeignKeyFieldModel>>
const ForeignKeyField: TForeignKey = ({ field, change, ...attr }) => {
    const default_value = field.value
        ? field.value[0]
        : field.initial || undefined

    return (
        <ChoicesField<typeof field.choices[0]>
            {...attr}
            onChange={e => change(e.currentTarget.value)}
            defaultValue={default_value}
            choices={field.choices}
            get_value={c => c[0]}
            get_label={c => c[1]}
        />
    )
}

export { ForeignKeyField }
