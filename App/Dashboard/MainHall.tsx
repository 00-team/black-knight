import React, { FC, useEffect } from 'react'

import { AiFillFolderAdd } from '@react-icons/all-files/ai/AiFillFolderAdd'

import { useParams } from 'react-router-dom'

import { useAtom } from 'jotai'
import { ManiacListAtom } from 'state/atoms'

import SearchInput from 'comps/SearchInput'
import Select from 'comps/Select'

import './style/mainhall.scss'

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

const MainHall: FC = () => {
    const { app_label, model_name } = useParams()
    const [ManiacList, UpdateManiacList] = useAtom(ManiacListAtom)

    useEffect(() => {
        if (app_label && model_name) UpdateManiacList({ app_label, model_name })
    }, [app_label, model_name])

    useEffect(() => {
        console.log(ManiacList)
    }, [ManiacList])

    if (!app_label) return <SectionInActive />

    return (
        <>
            <div className='mainhall'>
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

                {/* <div className='data-wrapper'>
                    <div className='add-wrapper'></div>

                    {// no need for filter for now }
                    {// <div className='filter-wrapper'></div> }

                    {// make a new component for rendering the list }
                    <table>
                        <thead>
                            <tr>
                                {ManiacList.instance_labels.map(
                                    (label, index) => (
                                        <th key={index}>{label}</th>
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {ManiacList.instances.map((instance, index) => (
                                <tr key={index}>
                                    {instance.map((label, idx) => (
                                        <td key={idx}>{label}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> */}
            </div>
        </>
    )
}

export default MainHall

const SectionInActive = () => {
    let dn = -0.5
    return (
        <div className='mainhall no-section title'>
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
