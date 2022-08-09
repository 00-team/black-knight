import React, { FC } from 'react'

import {
    BooleanFieldModel,
    DecimalFieldModel,
    FloatFieldModel,
    IntegerFieldModel,
} from 'state'

import { ChoicesField, FieldProps } from './shared'

type TBoolean = FC<FieldProps<BooleanFieldModel>>
const BooleanField: TBoolean = ({ field, change, ...attr }) => {
    const _ = (b: boolean) => (b ? '1' : '0')

    if (field.choices) {
        return (
            <ChoicesField<typeof field.choices[0]>
                {...attr}
                onChange={e => change(e.currentTarget.value)}
                defaultValue={_(field.value || field.initial)}
                choices={field.choices}
                get_label={c => c[1]}
                get_value={c => _(c[0])}
            />
        )
    }

    return (
        <input
            {...attr}
            type='checkbox'
            defaultChecked={field.value || field.initial}
            onChange={e => change(_(e.target.checked))}
        />
    )
}

type TInteger = FC<FieldProps<IntegerFieldModel>>
const IntegerField: TInteger = ({ field, change, ...attr }) => {
    if (field.choices) {
        return (
            <ChoicesField<typeof field.choices[0]>
                {...attr}
                onChange={e => change(e.currentTarget.value)}
                defaultValue={field.value || field.initial}
                choices={field.choices}
                get_label={c => c[1]}
                get_value={c => c[0]}
            />
        )
    }

    return (
        <input
            {...attr}
            type='number'
            min={field.min}
            max={field.max}
            defaultValue={field.value || field.initial}
            onChange={e => change(e.target.value)}
        />
    )
}

type TDecimal = FC<FieldProps<DecimalFieldModel>>
const DecimalField: TDecimal = ({ field, change, ...attr }) => {
    if (field.choices) {
        return (
            <ChoicesField<typeof field.choices[0]>
                {...attr}
                onChange={e => change(e.currentTarget.value)}
                defaultValue={field.value || field.initial}
                choices={field.choices}
                get_label={c => c[1]}
                get_value={c => c[0]}
            />
        )
    }

    return (
        <input
            {...attr}
            type='number'
            defaultValue={field.value || field.initial}
            // max length doesn't work with number inputs
            maxLength={field.max_digits}
            onChange={e => change(e.target.value)}
        />
    )
}
type TFloat = FC<FieldProps<FloatFieldModel>>
const FloatField: TFloat = ({ field, change, ...attr }) => {
    if (field.choices) {
        return (
            <ChoicesField<typeof field.choices[0]>
                {...attr}
                onChange={e => change(e.currentTarget.value)}
                defaultValue={field.value || field.initial}
                choices={field.choices}
                get_label={c => c[1]}
                get_value={c => c[0]}
            />
        )
    }

    return (
        <input
            {...attr}
            type='number'
            defaultValue={field.value || field.initial}
            onChange={e => change(e.target.value)}
        />
    )
}

export { BooleanField, IntegerField, DecimalField, FloatField }
