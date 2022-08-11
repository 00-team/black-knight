import React, { FC } from 'react'

import { VWT_ALL } from 'state'

import { Boolean } from 'components'

// TODO: update this renders
const RenderValue: FC<{ v: VWT_ALL }> = ({ v }) => {
    if (v === null) return <> -empty- </>

    if (Array.isArray(v))
        switch (v[0]) {
            case 'image':
                return (
                    <img
                        src={v[1] || ''}
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

            // case 'link':
            //     return <a href={v[1]}>{v[1]}</a>

            case 'datetime':
                const datetime = new Date(v[1])
                return (
                    <>
                        {datetime.toLocaleString(undefined, {
                            month: '2-digit',
                            year: 'numeric',
                            day: '2-digit',

                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',

                            hour12: false,
                        })}
                    </>
                )

            case 'date':
                const date = new Date(v[1])
                return (
                    <>
                        {date.toLocaleString(undefined, {
                            month: '2-digit',
                            year: 'numeric',
                            day: '2-digit',
                        })}
                    </>
                )

            case 'foreign_key':
                return <>{v[2]}</>
        }

    switch (typeof v) {
        case 'boolean':
            return <Boolean v={v} />

        // case '':
        //     return <>{v.toLocaleString()}</>

        default:
            return <>{v}</>
    }
}

export { RenderValue }
