import React, { HTMLAttributes, ReactNode } from 'react'

// TF as Field Type or Type Field
interface FieldProps<TF> extends HTMLAttributes<HTMLElement> {
    change: (v: string | Blob) => void
    field: TF
}

interface SelectProps<choice> extends HTMLAttributes<HTMLSelectElement> {
    choices: choice[]
    get_label: (c: choice, i: number) => ReactNode
    get_value: (c: choice, i: number) => string | number
}

function ChoicesField<choice>(props: SelectProps<choice>) {
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

export { FieldProps, ChoicesField }
