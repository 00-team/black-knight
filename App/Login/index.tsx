import React, { FC } from 'react'

import Form from './Form'

import './style/login.scss'

import moon from 'static/imgs/moon.png'

const Login: FC = () => {
    return (
        <div className='login-container'>
            <div className='stars'>
                <div id='stars'></div>
                <div id='stars2'></div>
                <div id='stars3'></div>
            </div>
            <img className='moon' src={moon} alt=''></img>

            <div className='form-container'>
                <Form />
            </div>
        </div>
    )
}

export default Login
