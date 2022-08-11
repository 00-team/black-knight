import React, { FC } from 'react'

import { DateFieldModel, DateTimeFieldModel, TimeFieldModel } from 'state'

import { FieldProps } from './shared'

type TDate = FC<FieldProps<DateFieldModel>>
const DateField: TDate = ({ field, change, ...attr }) => {
    const default_value = field.value || field.initial

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
    let default_value = field.value || field.initial
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

type TTime = FC<FieldProps<TimeFieldModel>>
const TimeField: TTime = ({ field, change, ...attr }) => {
    const default_value = field.value || field.initial

    return (
        <input
            {...attr}
            type='time'
            defaultValue={default_value}
            onChange={e => change(e.target.value)}
        />
    )
}

export { DateField, DateTimeField, TimeField }
