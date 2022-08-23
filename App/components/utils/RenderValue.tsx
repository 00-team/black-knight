import React, { FC } from 'react'

import { D_ALL, D_ManyToMany } from 'state'

import { Boolean, RawHtml } from 'components'

interface RenderValueProps {
    value: D_ALL
    empty?: string
    link?: boolean
}

// TODO: update this renders
const RenderValue: FC<RenderValueProps> = props => {
    const { value, empty = '-empty-', link = true } = props

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
            if (link) return <a href={value[1] || ''}>{value[1]}</a>
            else return <>{value[1]}</>

        case 'foreign_key':
            if (link) return <a href={value[2]}>{value[1]}</a>
            else return <>{value[1]}</>

        case 'html':
            return <RawHtml html={value[1]} />

        case 'many_to_many':
            return <ManyToMany value={value} link={link} />

        case 'url':
            if (link) return <a href={value[1]}>{value[1]}</a>
            else return <>{value[1]}</>

        default:
            return <>Unknown Value</>
    }
}

export { RenderValue }

interface ManyToManyProps {
    value: D_ManyToMany
    link: boolean
}

const ManyToMany: FC<ManyToManyProps> = ({ value, link }) => {
    if (link) {
        return (
            <ul>
                {value[1].map((item, idx) => (
                    <li key={idx}>
                        <a href={item[1]}>{item[0]}</a>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <ul>
            {value[1].map((item, idx) => (
                <li key={idx}>{item[0]}</li>
            ))}
        </ul>
    )
}

const DateTime: FC<{ dt: Date }> = ({ dt }) => {
    const _ = (n: number) => (n < 10 ? `0${n}` : `${n}`)

    return (
        <>
            {dt.getFullYear()}-{_(dt.getMonth())}-{_(dt.getDate())}{' '}
            {_(dt.getHours())}:{_(dt.getMinutes())}:{_(dt.getSeconds())}
        </>
    )
}
