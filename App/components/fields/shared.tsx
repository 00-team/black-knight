import React, { HTMLAttributes, ReactNode } from 'react'

// TF as Field Type or Type Field
type ChaneValue = (string | Blob) | (string | Blob)[]
interface FieldProps<TF> extends HTMLAttributes<HTMLElement> {
    change: (v: ChaneValue) => void
    field: TF
}

interface SelectProps<choice> extends HTMLAttributes<HTMLSelectElement> {
    choices: choice[]
    get_label: (c: choice, i: number) => ReactNode
    get_value: (c: choice, i: number) => string | number
    multiple?: boolean
    get_selected?: (c: choice, i: number) => boolean
}

function ChoicesField<choice>(props: SelectProps<choice>) {
    let { choices, get_label, get_value, multiple, get_selected, ...attr } =
        props

    return (
        <select multiple={multiple} {...attr}>
            {choices.map((c, i) => (
                <option
                    key={i}
                    value={get_value(c, i)}
                    selected={multiple && get_selected && get_selected(c, i)}
                >
                    {get_label(c, i)}
                </option>
            ))}
        </select>
    )
}

export { FieldProps, ChoicesField }
