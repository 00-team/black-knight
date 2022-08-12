import React, { FC } from 'react'

import { VWT_ALL } from 'state'

import { Boolean, RawHtml } from 'components'

interface RenderValueProps {
    value: VWT_ALL
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

        // TODO: nicer display for datetime
        case 'datetime':
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
            return <>{value[2]}</>

        case 'html':
            return <RawHtml html={value[1]} />

        // TODO: better display for many to many
        case 'many_to_many':
            return <>{value[1].map(([, label]) => ` -${label}- `)}</>

        // case 'choice'

        default:
            return <>Unknown Value</>
    }

    // if (Array.isArray(v))
    //     switch (v[0]) {
    //         case 'image':
    //             return (

    //             )

    //         // case 'link':
    //         //     return <a href={v[1]}>{v[1]}</a>

    //         case 'datetime':
    //             const datetime = new Date(v[1])
    //             return (
    //                 <>
    //                     {datetime.toLocaleString(undefined, {
    //                         month: '2-digit',
    //                         year: 'numeric',
    //                         day: '2-digit',

    //                         hour: '2-digit',
    //                         minute: '2-digit',
    //                         second: '2-digit',

    //                         hour12: false,
    //                     })}
    //                 </>
    //             )

    //         case 'date':
    //             const date = new Date(v[1])
    //             return (
    //                 <>
    //                     {date.toLocaleString(undefined, {
    //                         month: '2-digit',
    //                         year: 'numeric',
    //                         day: '2-digit',
    //                     })}
    //                 </>
    //             )

    //         case 'foreign_key':
    //             return <>{v[2]}</>
    //     }

    // switch (typeof v) {
    //     case 'boolean':
    //         return <Boolean v={v} />

    //     // case '':
    //     //     return <>{v.toLocaleString()}</>

    //     default:
    //         return <>{v}</>
    // }
}

export { RenderValue }
