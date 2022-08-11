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
        ? field.value.map(([pk]) => pk.toString())
        : field.initial.map(pk => pk.toString())

    return (
        <ChoicesField<typeof field.choices[0]>
            {...attr}
            multiple
            onChange={e => {
                const selected = Array.from(
                    e.currentTarget.selectedOptions
                ).map(option => option.value)

                change(selected)
            }}
            defaultValue={default_value}
            choices={field.choices}
            get_value={c => c[0]}
            get_label={c => c[1]}
        />
    )
}

export { ForeignKeyField, ManyToManyField }
