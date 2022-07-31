import React, { FC, HTMLAttributes, ReactNode } from 'react'

import { FieldProps } from '.'

import { CharFieldModel } from 'state'

interface SelectProps<choice> extends HTMLAttributes<HTMLSelectElement> {
    choices: choice[]
    get_label: (c: choice, i: number) => ReactNode
    get_value: (c: choice, i: number) => string | number
}

function Select<choice>(props: SelectProps<choice>) {
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

type TChar = FC<FieldProps<CharFieldModel>>
const CharField: TChar = ({ field, change, ...attr }) => {
    if (field.choices) {
        return (
            <Select<typeof field.choices[0]>
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
            type='text'
            defaultValue={field.value || field.initial}
            maxLength={field.max_length}
            onChange={e => change(e.target.value)}
        />
    )
}

export { CharField }
