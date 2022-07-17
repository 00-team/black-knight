import React from 'react'

import { BsPersonFill } from '@react-icons/all-files/bs/BsPersonFill'
import { FaLock } from '@react-icons/all-files/fa/FaLock'

import './style/loginform.scss'

const LoginForm = () => {
    return (
        <div className='login_form-container'>
            <LoginFormWrapper />
            <div className='forgot_password-wrapper'></div>
        </div>
    )
}

export default LoginForm

const LoginFormWrapper = () => {
    return (
        <div className='login_wrapper'>
            <h1 className='login_title title'>Login</h1>
            <div className='form'>
                <div tabIndex={1} className='input-container'>
                    <label htmlFor='Username'>
                        <div className='icon'>
                            <BsPersonFill size={18} />
                        </div>
                        <div className='holder'>Username</div>
                    </label>
                    <input type={'text'} id='Username' />
                </div>
                <div className='input-container'>
                    <label htmlFor='Password'>
                        <div className='icon'>
                            <FaLock size={18} />
                        </div>
                        <div className='holder'>Password</div>
                    </label>
                    <input type={'password'} id='Password' />
                </div>
            </div>
            <div className='button-container'>
                <button>send</button>
            </div>
        </div>
    )
}
