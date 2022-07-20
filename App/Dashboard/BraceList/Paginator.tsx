import React, { useState } from 'react'

import { BsQuestion } from '@react-icons/all-files/bs/BsQuestion'
import { IoMdSend } from '@react-icons/all-files/io/IoMdSend'

import './style/paginator.scss'

const Paginator = () => {
    // debug
    const TotalPages = 50

    const [SendPage, setSendPage] = useState({
        page: 1,
        status: false,
    })
    const [IsActive, setIsActive] = useState(false)

    const PageNumber = (value: string) => {
        if (parseInt(value) > 0 && parseInt(value) !== SendPage.page) {
            return setSendPage({
                page: parseInt(value),
                status: true,
            })
        } else if (value.length === 0 || parseInt(value) === 0) {
            return setSendPage({
                ...SendPage,
                status: false,
            })
        }
        console.log('idk')
        return
    }
    return (
        <div className='paginator-container'>
            <ul className='paginator-items '>
                {Array.from(Array(5).keys()).map((_, index) => {
                    return (
                        <li
                            key={index}
                            className='paginator-item title_smaller'
                        >
                            <button
                                onClick={() =>
                                    setSendPage({ ...SendPage, page: index })
                                }
                                className='paginator-link paginator-link-number'
                            >
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
                    <button
                        onClick={() =>
                            setSendPage({ ...SendPage, page: TotalPages })
                        }
                        className='paginator-link paginator-link-number'
                    >
                        {TotalPages}
                    </button>
                </li>
            </ul>
            <div className={`goto-container ${IsActive ? 'active' : ''}`}>
                <input
                    type={'number'}
                    placeholder='Page Number...'
                    autoFocus={IsActive}
                    onChange={e => {
                        PageNumber(e.target.value)
                    }}
                />
                <button
                    className={`${SendPage.status ? 'active' : ''}`}
                    onClick={() => setIsActive(!IsActive)}
                >
                    <div className='before'>
                        <BsQuestion size={30} fill={'black'} />
                    </div>
                    <div className='after'>
                        <IoMdSend size={28} fill={'black'} />
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Paginator