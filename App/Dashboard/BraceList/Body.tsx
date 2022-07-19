import React, { FC, useEffect } from 'react'

import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { BraceResultAtom, BraceSelectAtom, PKMapAtom, ResultModel } from 'state'

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
            {/* <Link to={`change/${pk}`}> */}
            {result.slice(1).map((field, index) => {
                if (Array.isArray(field)) {
                    if (field[0] === 'image') {
                        return (
                            <td key={index}>
                                <img
                                    src={field[1] || ''}
                                    loading='lazy'
                                    alt={pk.toString()}
                                    width={100}
                                    height={100}
                                    style={{
                                        objectFit: 'contain',
                                        border: '1px solid #fff',
                                        borderRadius: 7,
                                    }}
                                />
                            </td>
                        )
                    }
                }

                if (field === null) return <td key={index}> -empty- </td>

                switch (typeof field) {
                    case 'boolean':
                        return <td key={index}>{field ? '✅' : '❌'}</td>

                    case 'number':
                        return <td key={index}>{field}</td>

                    default:
                        return <td key={index}>{field}</td>
                }
            })}
            {/* </Link> */}
        </tr>
    )
}

export { BraceBody }

const range = (min: number, max: number) =>
    Array.from(Array(max - min + 1), (_, i) => min + i)
