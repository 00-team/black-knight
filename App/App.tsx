import React, { FC } from 'react'

import { useAlert } from '@00-team/react-alert'
import loadable from '@loadable/component'
import { Route, Routes } from 'react-router-dom'

import { BouncyText } from './components'

import './style/base.scss'
import './style/fonts/imports.scss'

const Dashboard = loadable(() => import('Dashboard'))
const BraceForm = loadable(() => import('Dashboard/BraceForm'))
const BraceList = loadable(() => import('Dashboard/BraceList'))
const Login = loadable(() => import('Login'))

const App: FC = () => {
    global.ReactAlert = useAlert()

    return (
        <Routes>
            <Route path='login' element={<Login />} />

            <Route path='' element={<Dashboard />}>
                <Route index element={<BraceText text='Select a Model' />} />
                <Route path=':app_label/:model_name'>
                    <Route path='' element={<BraceList />} />
                    <Route path='add' element={<BraceForm />} />
                    <Route path='change/:pk' element={<BraceForm />} />
                </Route>
                <Route path='*' element={<BraceText text='Not Found' />} />
            </Route>
        </Routes>
    )
}

const BraceText: FC<{ text: string }> = ({ text }) => (
    <div className='brace-text'>
        <BouncyText text={text} />
    </div>
)

export default App
