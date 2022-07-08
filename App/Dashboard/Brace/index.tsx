import React, { FC, useEffect } from 'react'

import { AiFillFolderAdd } from '@react-icons/all-files/ai/AiFillFolderAdd'

import { useParams } from 'react-router-dom'

import { atom, useAtom, useAtomValue } from 'jotai'
import { BraceInfoAtom, BraceResultAtom, BraceResultUpdateParams } from 'state'

import SearchInput from 'comps/SearchInput'
import Select from 'comps/Select'
import BouncyText from 'comps/common/BouncyText'

import { BraceBody } from './Body'
import { BraceHead } from './Head'

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

const ListParamsAtom = atom<BraceResultUpdateParams>({ app_model: '' })

const Brace: FC = () => {
    const { app_label, model_name } = useParams()
    const [ListParams, UpdateListParams] = useAtom(ListParamsAtom)
    const [BraceInfo, UpdateBraceInfo] = useAtom(BraceInfoAtom)
    const [, UpdateBraceResult] = useAtom(BraceResultAtom)

    useEffect(() => {
        if (!app_label || !model_name) return
        const app_model = `${app_label}/${model_name}`

        UpdateListParams({ ...ListParams, app_model })
        UpdateBraceInfo(app_model)
    }, [app_label, model_name])

    useEffect(() => {
        UpdateBraceResult(ListParams)
    }, [ListParams])

    if (!app_label || !model_name)
        return (
            <div className='brace no-section'>
                <BouncyText text='Please Select a Model' />
            </div>
        )

    return (
        <div className='brace'>
            <div className='header'>
                {BraceInfo !== 'loading' && BraceInfo.show_search && (
                    <div className='search-container'>
                        <SearchInput
                            submit={query =>
                                UpdateListParams({
                                    ...ListParams,
                                    search: query,
                                })
                            }
                        />
                    </div>
                )}

                <div className='options-wrapper title_smaller'>
                    <div className='add-container'>
                        <div className='holder'>
                            Add <span className='model_name'>{model_name}</span>
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
            <Result />
        </div>
    )
}

const Loading: FC = () => <div>Loading ...</div>

const Result: FC = () => {
    const BraceInfo = useAtomValue(BraceInfoAtom)
    const BraceResult = useAtomValue(BraceResultAtom)

    if (BraceInfo === 'loading') return <Loading />

    return (
        <div className='result'>
            <table>
                <BraceHead
                    headers={BraceInfo.headers}
                    results_length={
                        BraceResult === 'loading'
                            ? 0
                            : BraceResult.results.length
                    }
                />

                {BraceResult !== 'loading' && <BraceBody />}
            </table>

            {/* loading under the table for results */}
            {BraceResult === 'loading' && <Loading />}
        </div>
    )
}

export default Brace
