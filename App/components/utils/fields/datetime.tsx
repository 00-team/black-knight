import React, { FC } from 'react'

import { FieldProps } from '.'

import { DateFieldModel, DateTimeFieldModel } from 'state'

type TDate = FC<FieldProps<DateFieldModel>>
const DateField: TDate = ({ field, change, ...attr }) => {
    const default_value = field.value ? field.value[1] : field.initial

    return (
        <input
            {...attr}
            type='date'
            defaultValue={default_value}
            onChange={e => change(e.target.value)}
        />
    )
}

type TDateTime = FC<FieldProps<DateTimeFieldModel>>
const DateTimeField: TDateTime = ({ field, change, ...attr }) => {
    let default_value = field.value ? field.value[1] : field.initial
    default_value = new Date(default_value).toISOString().slice(0, -1)

    return (
        <input
            {...attr}
            type='datetime-local'
            defaultValue={default_value}
            onChange={e => change(e.target.value)}
        />
    )
}

export { DateField, DateTimeField }
