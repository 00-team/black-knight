import React, { FC, useEffect } from 'react'

import { ForeignKeyFieldModel, ManyToManyFieldModel } from 'state'

import { ChoicesField, FieldProps } from './shared'

type TForeignKey = FC<FieldProps<ForeignKeyFieldModel>>
const ForeignKeyField: TForeignKey = ({ field, change, ...attr }) => {
    // TODO: clean this mess

    const default_value =
        field.value !== undefined
            ? field.value
            : field.choices[0]
            ? field.choices[0][0]
            : field.initial || undefined

    useEffect(() => {
        if (default_value !== undefined) change(`${default_value}`)
    }, [default_value])

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
    const default_value = (
        field.value !== undefined ? field.value : field.initial || []
    ).map(item => `${item}`)

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
