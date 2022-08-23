import React, { FC } from 'react'

import { ReadOnlyFieldModel, UnknownFieldModel } from 'state'

import { RenderValue } from 'components'

type TReadOnly = FC<{ field: ReadOnlyFieldModel }>
const ReadOnlyField: TReadOnly = ({ field, ...attr }) => {
    return (
        <div {...attr}>
            {field.value ? <RenderValue value={field.value} /> : '-EMPTY-'}
        </div>
    )
}

type TUnknonw = FC<{ field: UnknownFieldModel }>
const UnknonwField: TUnknonw = ({ field, ...attr }) => {
    return <div {...attr}>Unknown</div>
}

export { ReadOnlyField, UnknonwField }
