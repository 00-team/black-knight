import React, { FC, useMemo, useState } from 'react'

import { C } from '@00-team/utils'

import { useAtom, useAtomValue } from 'jotai'
import { BraceResultAtom, BraceSelectAtom } from 'state'

interface BraceHeadProps {
    results_length: number
    headers: string[]
}

const BraceHead: FC<BraceHeadProps> = ({ results_length, headers }) => {
    const [Selecteds, UpdateSelecteds] = useAtom(BraceSelectAtom)
    const BraceResult = useAtomValue(BraceResultAtom)
    const [SelectAll, setSelectAll] = useState(false)

    const results = useMemo(
        () => (BraceResult === 'loading' ? 0 : BraceResult.result_count),
        [BraceResult]
    )

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
                                setSelectAll(checked)
                                UpdateSelecteds({
                                    type: checked ? 'add' : 'remove',
                                    id: 'page',
                                })
                            }}
                        />

                        <div
                            className={`selectall-wrapper title_smaller ${C(
                                SelectAll
                            )}`}
                        >
                            <input
                                className='selectall-checkbox'
                                type={'checkbox'}
                            />
                            <div className='holder'>
                                Select All Of {results}?
                            </div>
                        </div>
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
