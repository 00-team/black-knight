import React, { FC } from 'react'

import { ReadOnlyFieldModel, UnknownFieldModel } from 'state'

type TReadOnly = FC<{ field: ReadOnlyFieldModel }>
const ReadOnlyField: TReadOnly = ({ field, ...attr }) => {
    console.log(field.name)

    return <div {...attr}>read only</div>
}

type TUnknonw = FC<{ field: UnknownFieldModel }>
const UnknonwField: TUnknonw = ({ field, ...attr }) => {
    return <div {...attr}>Unknown Field</div>
}

export { ReadOnlyField, UnknonwField }
