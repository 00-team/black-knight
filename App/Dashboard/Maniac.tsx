import React, { FC, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { useAtom } from 'jotai'
import { ManiacListAtom } from 'state/atoms'

// import SearchInput from 'comps/SearchInput'
import './style/maniac.scss'

const Maniac: FC = () => {
    const { app_label, model_name } = useParams()
    const [ManiacList, UpdateManiacList] = useAtom(ManiacListAtom)

    useEffect(() => {
        if (app_label && model_name) UpdateManiacList({ app_label, model_name })
    }, [app_label, model_name])

    useEffect(() => {
        console.log(ManiacList)
    }, [ManiacList])

    return (
        <>
            {/* {SectionActive === '' && (
                <div className='maniac no-section title'>
                    <span style={{ animationDelay: '0' }}>P</span>
                    <span style={{ animationDelay: '0.5s' }}>l</span>
                    <span style={{ animationDelay: '1s' }}>e</span>
                    <span style={{ animationDelay: '1.5s' }}>a</span>
                    <span style={{ animationDelay: '2s' }}>s</span>
                    <span style={{ animationDelay: '2.5s' }}>e</span>
                    <span className='space'></span>
                    <span style={{ animationDelay: '3s' }}>S</span>
                    <span style={{ animationDelay: '3.5s' }}>e</span>
                    <span style={{ animationDelay: '4s' }}>l</span>
                    <span style={{ animationDelay: '4.5s' }}>e</span>
                    <span style={{ animationDelay: '5s' }}>c</span>
                    <span style={{ animationDelay: '5.5s' }}>t</span>
                    <span className='space'></span>
                    <span style={{ animationDelay: '6s' }}>A</span>
                    <span className='space'></span>
                    <span style={{ animationDelay: '6.5s' }}>M</span>
                    <span style={{ animationDelay: '7s' }}>o</span>
                    <span style={{ animationDelay: '7.5s' }}>d</span>
                    <span style={{ animationDelay: '8s' }}>e</span>
                    <span style={{ animationDelay: '8.5s' }}>l</span>
                </div>
            )} */}

            <div className='maniac'>
                {/* {ManiacList.fieldset.map((field, index) => (
                    <div key={index}>
                        {field.name}

                        {/* {React.createElement(field.type)} /}
                    </div>
                ))} */}

                {/* no need for search bar for now */}
                {/* <div className='data-header'>
                    <div className='search-container'>
                        <SearchInput />
                    </div>
                    <div className='options-wrapper'></div>
                </div> */}

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

export default Maniac
