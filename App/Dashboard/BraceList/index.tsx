import React, { FC, Suspense, useEffect } from 'react'

import { AiFillFolderAdd } from '@react-icons/all-files/ai/AiFillFolderAdd'

import { Link, useParams } from 'react-router-dom'

import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { BraceInfoAtom, BraceResultAtom, ResultOptionsAtom } from 'state'

import { SearchInput, Select } from 'comps'

import { BraceBody } from './Body'
import { BraceHead } from './Head'
import Paginator from './Paginator'

import './style/brace-list.scss'

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

const BraceList: FC = () => {
    const { app_label, model_name } = useParams()

    const [BraceInfo, UpdateBraceInfo] = useAtom(BraceInfoAtom)

    const UpdateResultOptions = useSetAtom(ResultOptionsAtom)

    useEffect(() => {
        if (!app_label || !model_name) return
        const app_model = `${app_label}/${model_name}`

        UpdateBraceInfo(app_model)
        UpdateResultOptions({ app_model })
    }, [app_label, model_name])

    return (
        <div className='brace-list'>
            <div
                className={`header ${
                    BraceInfo !== 'loading' && BraceInfo.show_search
                        ? ''
                        : 'left'
                }`}
            >
                {BraceInfo !== 'loading' && BraceInfo.show_search && (
                    <div className='search-container'>
                        <SearchInput
                            submit={search => UpdateResultOptions({ search })}
                        />
                    </div>
                )}

                <div className='options-wrapper title_smaller'>
                    <Link to='add' className='add-container'>
                        <div className='holder'>
                            Add <span className='model_name'>{model_name}</span>
                        </div>
                        <div className='icon'>
                            <AiFillFolderAdd size={24} />
                        </div>
                    </Link>
                    <div className='filter-container'>
                        <Select
                            options={Model_opts}
                            defaultOpt={Model_opts[0]}
                        />
                    </div>
                </div>
            </div>
            <Suspense>
                <Result />
            </Suspense>
            <Paginator />
        </div>
    )
}

const Loading: FC = () => <div>Loading ...</div>

const Result: FC = () => {
    // 007: im not a fan of this layout
    // but its will do for now

    const BraceInfo = useAtomValue(BraceInfoAtom)
    const ResultOptions = useAtomValue(ResultOptionsAtom)
    const [BraceResult, UpdateBraceResult] = useAtom(BraceResultAtom)

    useEffect(() => {
        UpdateBraceResult()
    }, [ResultOptions])

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

export default BraceList
