import React, { FC } from 'react'

import { atom, useAtom, useAtomValue } from 'jotai'
import { BraceListAtom, BraceSelectAtom } from 'state'
import { ResultModel } from 'state/models'

const LastIndexAtom = atom<null | number>(null)

const BraceBody: FC = () => {
    const BraceList = useAtomValue(BraceListAtom)

    if (BraceList === 'loading') return <></>

    return (
        <tbody>
            {BraceList.results.map((item, index) => (
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
                            const checked = e.currentTarget.checked

                            if (!checked) return UpdateLastIndex(null)
                            if (LastIndex === null || !e.shiftKey)
                                return UpdateLastIndex(index)

                            let list: number[]
                            if (LastIndex > index)
                                list = range(index, LastIndex)
                            else list = range(LastIndex, index)

                            list.map(item => {
                                UpdateSelecteds({
                                    type: checked ? 'add' : 'remove',
                                    id: item,
                                })
                            })
                        }}
                    />
                </span>
            </td>
            {result.slice(1).map((field, index) => {
                if (Array.isArray(field)) {
                    if (field[0] === 'image') {
                        return (
                            <td key={index}>
                                <img
                                    src={field[1] || ''}
                                    loading='lazy'
                                    width={100}
                                    height={100}
                                    style={{
                                        objectFit: 'contain',
                                        border: '1px solid red',
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
        </tr>
    )
}

export { BraceBody }

const range = (min: number, max: number) =>
    Array.from(Array(max - min + 1), (_, i) => min + i)
