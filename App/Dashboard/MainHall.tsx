import React, { FC, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { useAtom } from 'jotai'
import { ManiacListAtom } from 'state/atoms'

import SearchInput from 'comps/SearchInput'

import './style/mainhall.scss'

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
                    <div className='options-wrapper'>
                        <div className='add-container'></div>
                        <div className='filter-container'></div>
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
