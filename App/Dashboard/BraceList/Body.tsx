import React, { FC, useEffect } from 'react'

import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
    BraceResultAtom,
    BraceSelectAtom,
    PKMapAtom,
    ResultModel,
    TValue,
} from 'state'

import { Boolean } from 'comps'

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
    const pk = result[0]
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
            {result.slice(1).map((field, index) => (
                <td key={index}>
                    <RenderValue v={field} />
                </td>
            ))}
        </tr>
    )
}

const RenderValue: FC<{ v: TValue }> = ({ v }) => {
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

            case 'link':
                return <a href={v[1]}>{v[1]}</a>

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
        }

    switch (typeof v) {
        case 'boolean':
            return <Boolean v={v} />

        case 'number':
            return <>{v.toLocaleString()}</>

        default:
            return <>{v}</>
    }
}

export { BraceBody }

const range = (min: number, max: number) =>
    Array.from(Array(max - min + 1), (_, i) => min + i)
