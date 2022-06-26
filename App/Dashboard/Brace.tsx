import React, { FC, useEffect, useState } from 'react'

import { AiFillFolderAdd } from '@react-icons/all-files/ai/AiFillFolderAdd'

import { useParams } from 'react-router-dom'

import { useAtom } from 'jotai'
import { BraceListAtom } from 'state/atoms'

import SearchInput from 'comps/SearchInput'
import Select from 'comps/Select'

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

interface SAMPLE_TABLE_DATA {
    result: [number, ...string[]][]
    header: string[]
}

const SAMPLE_TABLE: SAMPLE_TABLE_DATA = {
    result: [
        ['apple', 'Maria Anders', 'afghanestan'],
        ['apple', 'Maria Anders', 'afghanestan'],
        ['apple', 'Maria Anders', 'afghanestan'],
        ['apple', 'Maria Anders', 'afghanestan'],
        ['apple', 'Maria Anders', 'afghanestan'],
        ['apple', 'Maria Anders', 'afghanestan'],
        ['apple', 'Maria Anders', 'afghanestan'],
        ['apple', 'Maria Anders', 'afghanestan'],
        ['apple', 'Maria Anders', 'afghanestan'],
        ['apple', 'Maria Anders', 'afghanestan'],
        ['apple', 'Maria Anders', 'afghanestan'],
        ['apple', 'Maria Anders', 'afghanestan'],
        ['apple', 'Maria Anders', 'afghanestan'],
        ['apple', 'Maria Anders', 'afghanestan'],
        ['apple', 'Maria Anders', 'afghanestan'],
        ['apple', 'Maria Anders', 'afghanestan'],
        ['apple', 'Maria Anders', 'afghanestan'],
        ['apple', 'Maria Anders', 'afghanestan'],
    ].map((item, index) => [index, ...item]),

    header: ['Company', 'Contact', 'Country', 'test'],
}

var SelectedRows: number[] = []

const Brace: FC = () => {
    // const [RowActive, setRowActive] = useState([])

    const { app_label, model_name } = useParams()
    const [BraceList, UpdateBraceList] = useAtom(BraceListAtom)

    useEffect(() => {
        if (app_label && model_name) UpdateBraceList({ app_label, model_name })
    }, [app_label, model_name])

    useEffect(() => {
        console.log(BraceList)
    }, [BraceList])

    if (!app_label) return <SectionInActive />

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
                                <span className='model_name'>
                                    {' '}
                                    {model_name}
                                </span>
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
                            <tr className='title_small'>
                                <th className='checkbox'>
                                    <span>
                                        <input type='checkbox' name='' id='' />
                                    </span>
                                </th>
                                <th>Company</th>
                                <th>Contact</th>
                                <th>Country</th>
                                <th>Country</th>
                            </tr>
                        </thead>
                        <tbody className='description'>
                            {SAMPLE_TABLE.result.map((row, index) => {
                                return <BraceRow key={index} row={row} />
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

interface BraceRowProps {
    row: [number, ...string[]]
}

const BraceRow: FC<BraceRowProps> = ({ row }) => {
    const [IsActive, setIsActive] = useState(false)

    return (
        <tr>
            <td className='checkbox'>
                <span>
                    <input
                        type='checkbox'
                        name=''
                        id=''
                        checked={IsActive}
                        onChange={() => {
                            SelectedRows = SelectedRows.filter(
                                item => item !== row[0]
                            )

                            if (!IsActive) {
                                // active
                                SelectedRows.push(row[0])
                            }
                            setIsActive(!IsActive)
                            console.log(SelectedRows)
                        }}
                    />
                </span>
            </td>
            {row.map((cell, index) => {
                return <td key={index}>{cell}</td>
            })}
        </tr>
    )
}

const SectionInActive: FC = () => {
    let dn = -0.5
    return (
        <div className='brace no-section title'>
            {'Please Select a Model'.split('').map((w, idx) => {
                if (w === ' ') return <span key={idx} className='space' />
                dn += 0.5
                return (
                    <span key={idx} style={{ animationDelay: `${dn}s` }}>
                        {w}
                    </span>
                )
            })}
        </div>
    )
}

export default Brace
