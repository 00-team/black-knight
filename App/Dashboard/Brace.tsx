import React, { FC, useEffect, useState } from 'react'

import { AiFillFolderAdd } from '@react-icons/all-files/ai/AiFillFolderAdd'

import { useParams } from 'react-router-dom'

import { useAtom } from 'jotai'
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

const Brace: FC = () => {
    const [ShiftArray, setShiftArray] = useState([])

    const { app_label, model_name } = useParams()
    const [BraceList, UpdateBraceList] = useAtom(BraceListAtom)
    const [BraceInfo, UpdateBraceInfo] = useAtom(BraceInfoAtom)

    useEffect(() => {
        if (!app_label || !model_name) return
        const app_model = `${app_label}/${model_name}`

        UpdateBraceInfo(app_model)
        UpdateBraceList(app_model)
    }, [app_label, model_name])

    useEffect(() => {
        console.log(ShiftArray)
    }, [ShiftArray])

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
                        <SearchInput />
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
                                        setShiftArray={setShiftArray}
                                        ShiftArray={ShiftArray}
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

const BraceResult: FC<{
    result: ResultModel
    setShiftArray: (e: any) => void
    ShiftArray: number[]
}> = ({ result, ShiftArray, setShiftArray }) => {
    const [Selecteds, UpdateSelecteds] = useAtom(BraceSelectAtom)
    const pk = result[0]

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
                                if (ShiftArray.length === 0) {
                                    setShiftArray([pk])
                                } else if (e.shiftKey) {
                                    setShiftArray([...ShiftArray, pk])
                                } else if (!e.shiftKey) {
                                    setShiftArray([pk])
                                }
                            } else {
                                setShiftArray(
                                    ShiftArray.filter(id => id !== pk)
                                )
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
