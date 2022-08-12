import React, { FC } from 'react'

import { D_ALL } from 'state'

import { Boolean, RawHtml } from 'components'

interface RenderValueProps {
    value: D_ALL
    empty?: string
}

// TODO: update this renders
const RenderValue: FC<RenderValueProps> = ({ value, empty = '-empty-' }) => {
    switch (value[0]) {
        case 'null':
            return <>{empty}</>

        case 'bool':
            return <Boolean value={value[1]} />

        case 'decimal':
        case 'float':
        case 'integer':
            return <>{value[1].toLocaleString()}</>

        case 'datetime':
            return <DateTime dt={new Date(value[1])} />

        case 'date':
        case 'time':
        case 'timedelta':
            return <>{value[1]}</>

        case 'char':
            return <>{value[1]}</>

        // TODO: text highlighting for json
        case 'json':
            return <>{value[1]}</>

        case 'image':
            return (
                <img
                    src={value[1] || ''}
                    loading='lazy'
                    // alt={'GG'}
                    width={100}
                    height={100}
                    style={{
                        objectFit: 'contain',
                        border: '1px solid #fff',
                        borderRadius: 7,
                    }}
                />
            )
        case 'file':
            return <a href={value[1] || ''}>{value[1]}</a>

        case 'foreign_key':
            return <a href={value[2]}>{value[1]}</a>

        case 'html':
            return <RawHtml html={value[1]} />

        case 'many_to_many':
            return (
                <ul>
                    {value[1].map((item, idx) => (
                        <li key={idx}>
                            <a href={item[1]}>{item[0]}</a>
                        </li>
                    ))}
                </ul>
            )

        default:
            return <>Unknown Value</>
    }
}

export { RenderValue }

const DateTime: FC<{ dt: Date }> = ({ dt }) => {
    const _ = (n: number) => (n < 10 ? `0${n}` : `${n}`)

    return (
        <>
            {dt.getFullYear()}-{_(dt.getMonth())}-{_(dt.getDate())}{' '}
            {_(dt.getHours())}:{_(dt.getMinutes())}:{_(dt.getSeconds())}
        </>
    )
}
