import React, { FC, useEffect } from 'react'

import { useAtom } from 'jotai'
import { BraceSelectAtom } from 'state'

interface BraceHeadProps {
    results_length: number
    headers: string[]
}

const BraceHead: FC<BraceHeadProps> = ({ results_length, headers }) => {
    const [Selecteds, UpdateSelecteds] = useAtom(BraceSelectAtom)

    useEffect(() => {
        console.log(Selecteds)
    }, [Selecteds])

    const checked = () =>
        Selecteds === 'all' ||
        (Selecteds.length === results_length && Selecteds.length > 0)

    return (
        <thead>
            <tr className='title_small'>
                <th className='checkbox'>
                    <span>
                        <input
                            type='checkbox'
                            checked={checked()}
                            onChange={e => {
                                const checked = e.currentTarget.checked
                                UpdateSelecteds({
                                    type: checked ? 'add' : 'remove',
                                    id: 'page',
                                })
                            }}
                        />
                    </span>
                </th>
                {headers.map((head, index) => (
                    <th key={index}>{head}</th>
                ))}
            </tr>
        </thead>
    )
}

export { BraceHead }
