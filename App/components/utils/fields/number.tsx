import React, { FC } from 'react'

import { BooleanFieldModel } from 'state'

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

export { BooleanField }
