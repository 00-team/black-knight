import React, { FC, useEffect } from 'react'

import { Link } from 'react-router-dom'

import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { BraceResultAtom, BraceSelectAtom, PKMapAtom, ResultModel } from 'state'

import { RenderValue } from 'comps'

const LastIndexAtom = atom<null | number>(null)

const BraceBody: FC = () => {
    const BraceResult = useAtomValue(BraceResultAtom)
    const UpdateLastIndex = useSetAtom(LastIndexAtom)
    const Selecteds = useAtomValue(BraceSelectAtom)

    useEffect(() => {
        if (Selecteds.length === 0) UpdateLastIndex(null)
    }, [Selecteds])

    if (BraceResult === 'loading') return <></>

    return (
        <tbody>
            {BraceResult.results.map((item, index) => (
                <Result key={index} index={index} result={item} />
            ))}
        </tbody>
    )
}

interface ResultProps {
    result: ResultModel
    index: number
}

const Result: FC<ResultProps> = ({ result, index }) => {
    const [pk, ...results] = result
    const [Selecteds, UpdateSelecteds] = useAtom(BraceSelectAtom)
    const [LastIndex, UpdateLastIndex] = useAtom(LastIndexAtom)
    const PKMap = useAtomValue(PKMapAtom)

    return (
        <tr>
            <td className='checkbox'>
                <span>
                    <input
                        type='checkbox'
                        checked={
                            Selecteds === 'all' || Selecteds.indexOf(pk) !== -1
                        }
                        onChange={e => {
                            const checked = e.currentTarget.checked

                            UpdateSelecteds({
                                type: checked ? 'add' : 'remove',
                                id: pk,
                            })
                        }}
                        onClick={e => {
                            if (PKMap === 'loading') return
                            const checked = e.currentTarget.checked
                            const update_type = checked ? 'add' : 'remove'

                            if (checked) UpdateLastIndex(index)

                            if (LastIndex === null || !e.shiftKey) return

                            let list: number[]
                            if (LastIndex > index)
                                list = range(index, LastIndex)
                            else list = range(LastIndex, index)

                            list.forEach(item => {
                                const item_pk = PKMap[item]
                                if (!item_pk) return

                                UpdateSelecteds({
                                    type: update_type,
                                    id: item_pk,
                                })
                            })
                        }}
                    />
                </span>
            </td>
            {results.map((field, index) => (
                <td key={index}>
                    {index === 0 ? (
                        <Link to={`change/${pk}/`}>
                            <RenderValue value={field} />
                        </Link>
                    ) : (
                        <RenderValue value={field} />
                    )}
                </td>
            ))}
        </tr>
    )
}

export { BraceBody }

const range = (min: number, max: number) =>
    Array.from(Array(max - min + 1), (_, i) => min + i)
