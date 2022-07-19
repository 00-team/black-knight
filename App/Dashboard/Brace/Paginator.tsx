import React, { useState } from 'react'

import { BsQuestion } from '@react-icons/all-files/bs/BsQuestion'

import './style/paginator.scss'

const Paginator = () => {
    const [IsActive, setIsActive] = useState(false)
    return (
        <div className='paginator-container'>
            <ul className='paginator-items '>
                {Array.from(Array(5).keys()).map((_, index) => {
                    return (
                        <li
                            key={index}
                            className='paginator-item title_smaller'
                        >
                            <button className='paginator-link paginator-link-number'>
                                {index + 1}
                            </button>
                        </li>
                    )
                })}
                <li className='paginator-item title_smaller'>
                    <span className='paginator-link'>
                        <button className='paginator-link'>...</button>
                    </span>
                </li>
                <li className='paginator-item title_smaller'>
                    <button className='paginator-link paginator-link-number'>
                        50
                    </button>
                </li>
            </ul>
            <div className={`goto-container ${IsActive ? 'active' : ''}`}>
                <input
                    type={'number'}
                    placeholder='Page Number...'
                    autoFocus={IsActive}
                />
                <button onClick={() => setIsActive(!IsActive)}>
                    <BsQuestion size={30} fill={'black'} />
                </button>
            </div>
        </div>
    )
}

export default Paginator
