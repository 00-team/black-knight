import React, { FC } from 'react'

import { ForeignKeyFieldModel, ManyToManyFieldModel } from 'state'

import { ChoicesField, FieldProps } from './shared'

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

type TManyToMany = FC<FieldProps<ManyToManyFieldModel>>
const ManyToManyField: TManyToMany = ({ field, change, ...attr }) => {
    const default_value = field.value
        ? field.value[1]
        : field.initial || undefined

    return (
        <ChoicesField<typeof field.choices[0]>
            {...attr}
            multiple
            onChange={e => {
                // console.log(new Map(e.currentTarget.selectedOptions))

                const selected = Array.from(
                    e.currentTarget.selectedOptions
                ).map(option => option.value)
                console.log(selected)
                change(selected)
            }}
            // defaultValue={default_value}
            choices={field.choices}
            get_value={c => c[0]}
            get_label={c => c[1]}
            get_selected={c => default_value.includes(c[0])}
        />
    )
}

export { ForeignKeyField, ManyToManyField }
