import React, { FC, useEffect } from 'react'

import { AiFillFolderAdd } from '@react-icons/all-files/ai/AiFillFolderAdd'

import { useParams } from 'react-router-dom'

import { atom, useAtom } from 'jotai'
import { BraceInfoAtom, BraceListAtom, BraceSelectAtom } from 'state/atoms'
import { ResultModel } from 'state/models'

import SearchInput from 'comps/SearchInput'
import Select from 'comps/Select'
import BouncyText from 'comps/common/BouncyText'

import './style/brace.scss'

const Model_opts = [
    {
        lable: 'All',
        value: null,
    },
    {
        lable: 'Date (New-Old)',
        value: 'date',
    },
    {
        lable: 'Date (Old-New)',
        value: 'date_reverse',
    },
]

const LastIndexAtom = atom<null | number>(null)

const Brace: FC = () => {
    const { app_label, model_name } = useParams()
    const [BraceList, UpdateBraceList] = useAtom(BraceListAtom)
    const [BraceInfo, UpdateBraceInfo] = useAtom(BraceInfoAtom)

    useEffect(() => {
        if (!app_label || !model_name) return
        const app_model = `${app_label}/${model_name}`

        UpdateBraceInfo(app_model)
        UpdateBraceList(app_model)
    }, [app_label, model_name])

    if (!app_label)
        return (
            <BouncyText
                text='Please Select a Model'
                className='brace no-section title'
            />
        )

    return (
        <>
            <div className='brace'>
                {/* no need for search bar for now */}
                <div className='data-header'>
                    <div className='search-container'>
                        <SearchInput submit={() => ''} />
                    </div>
                    <div className='options-wrapper title_smaller'>
                        <div className='add-container'>
                            <div className='holder'>
                                Add
                                <span className='model_name'>{model_name}</span>
                            </div>
                            <div className='icon'>
                                <AiFillFolderAdd size={24} />
                            </div>
                        </div>
                        <div className='filter-container'>
                            <Select
                                options={Model_opts}
                                defaultOpt={Model_opts[0]}
                            />
                        </div>
                    </div>
                </div>
                <div className='data-wrapper'>
                    <table className='data-table'>
                        <thead>
                            {BraceInfo === 'loading' ? (
                                <tr>
                                    <td>Loading ...</td>
                                </tr>
                            ) : (
                                <BraceHead
                                    headers={BraceInfo.headers}
                                    results_length={
                                        BraceList === 'loading'
                                            ? 0
                                            : BraceList.results.length
                                    }
                                />
                            )}
                        </thead>
                        <tbody className='description'>
                            {BraceList === 'loading' ? (
                                <tr>
                                    <td>Loading ...</td>
                                </tr>
                            ) : (
                                BraceList.results.map((result, index) => (
                                    <BraceResult
                                        key={index}
                                        result={result}
                                        index={index}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

interface BraceHeadProps {
    results_length: number
    headers: string[]
}

const BraceHead: FC<BraceHeadProps> = ({ results_length, headers }) => {
    const [Selecteds, UpdateSelecteds] = useAtom(BraceSelectAtom)

    const checked = () =>
        Selecteds === 'all' ||
        (Selecteds.length === results_length && Selecteds.length > 0)

    return (
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
    )
}

interface BraceResultProps {
    result: ResultModel
    index: number
}

const BraceResult: FC<BraceResultProps> = ({ result, index }) => {
    const [Selecteds, UpdateSelecteds] = useAtom(BraceSelectAtom)
    const [LastIndex, UpdateLastIndex] = useAtom(LastIndexAtom)
    const pk = result[0]

    useEffect(() => {
        console.log(LastIndex)
    }, [LastIndex])
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

                            if (checked) {
                                // if (ShiftArray.length === 0) {
                                //     setShiftArray([pk])
                                // } else if (e.shiftKey) {
                                //     setShiftArray([...ShiftArray, pk])

                                //     console.log(Getrange(ShiftArray[0]!, index))
                                // } else if (!e.shiftKey) {
                                //     setShiftArray([pk])
                                // }

                                if (LastIndex === null) UpdateLastIndex(index)
                                else {
                                    if (e.shiftKey) {
                                        const Getrange = (
                                            min: number,
                                            max: number
                                        ) =>
                                            Array.from(
                                                { length: max - min + 1 },
                                                (_, i) => min + i
                                            )

                                        console.log(Getrange(LastIndex, index))
                                        if (LastIndex > index) {
                                            Getrange(index, LastIndex).map(
                                                item => {
                                                    UpdateSelecteds({
                                                        type: checked
                                                            ? 'add'
                                                            : 'remove',
                                                        id: item,
                                                    })
                                                }
                                            )
                                        } else {
                                            Getrange(LastIndex, index).map(
                                                item => {
                                                    UpdateSelecteds({
                                                        type: checked
                                                            ? 'add'
                                                            : 'remove',
                                                        id: item,
                                                    })
                                                }
                                            )
                                        }
                                    } else {
                                        UpdateLastIndex(index)
                                    }
                                }
                            } else {
                                UpdateLastIndex(null)
                            }
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
                                    alt=''
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

                // const type = Object.keys(field)[0]
                // const value = Object.values(field)[0]

                // switch (type) {
                //     case ResultType.bool:
                //

                //     case ResultType.empty:
                //     case ResultType.image:
                //     case ResultType.char:
                //         return <td key={index}>{value}</td>

                //     case ResultType.datetime:
                //         return <td key={index}>{value[1]}</td>

                //     case ResultType.number:
                //         return <td key={index}>{value}</td>

                //     default:
                //         return <td key={index}></td>
                // }
            })}
        </tr>
    )
}

export default Brace
