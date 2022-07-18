import React, { FC, useEffect, useState } from 'react'

import { BsPersonFill } from '@react-icons/all-files/bs/BsPersonFill'
import { FaLock } from '@react-icons/all-files/fa/FaLock'
import { IoPaperPlane } from '@react-icons/all-files/io5/IoPaperPlane'

import { useNavigate, useSearchParams } from 'react-router-dom'

import { Login as AuthLogin } from 'state'

import './style/form.scss'

interface TAuthData {
    username: string
    password: string
}

const Form: FC = () => {
    const [AuthData, setAuthData] = useState<TAuthData>({
        username: '',
        password: '',
    })

    // for stroing ?next=/admin/12/
    const [NextURL, setNextURL] = useState<string | null>(null)

    const navigate = useNavigate()
    const [SearchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        let n = SearchParams.get('next')
        // by defualt next is /admin/ and we dont want it like this.
        if (n !== BASE_URL) setNextURL(n)

        // delete only next=... from query params
        SearchParams.delete('next')
        setSearchParams(SearchParams)
    }, [])

    const Submit = async () => {
        if (await AuthLogin(AuthData)) navigate(GetNextURL(NextURL))
    }

    return (
        <div className='login_form-container'>
            <div className='login_wrapper'>
                <h1 className='login_title title'>Login</h1>
                <div className='form'>
                    <div tabIndex={1} className='input-container'>
                        <label htmlFor='username'>
                            <div className='icon'>
                                <BsPersonFill size={18} />
                            </div>
                            <div className='holder'>Username</div>
                        </label>
                        <input
                            autoComplete='on'
                            type='text'
                            id='username'
                            onChange={e =>
                                setAuthData({
                                    ...AuthData,
                                    username: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className='input-container'>
                        <label htmlFor='password'>
                            <div className='icon'>
                                <FaLock size={18} />
                            </div>
                            <div className='holder'>Password</div>
                        </label>
                        <input
                            autoComplete='on'
                            type='password'
                            id='password'
                            onChange={e =>
                                setAuthData({
                                    ...AuthData,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className='button-container title_small'>
                    <button onClick={() => Submit()}>
                        <div className='holder'>Send</div>
                        <div className='icon'>
                            <IoPaperPlane size={20} />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

const GetNextURL = (next: string | null) => {
    if (!next) return '/'

    if (next.at(-1) != '/') next = next + '/'
    if (next.startsWith(BASE_URL)) next = next.slice(BASE_URL.length)

    if (next.at(0) != '/') return '/' + next

    return next
}

export default Form
