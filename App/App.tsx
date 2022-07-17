import React, { FC } from 'react'

import loadable from '@loadable/component'
import { Route, Routes } from 'react-router-dom'

import './style/base.scss'

// import Dashboard from 'Dashboard'
// import Login from 'Login'

const Dashboard = loadable(() => import('Dashboard'))
const Login = loadable(() => import('Login'))

const App: FC = () => {
    return (
        <Routes>
            <Route path='login' element={<Login />} />

            <Route path='' element={<Dashboard />}>
                <Route path=':app_label/:model_name' element={<Dashboard />} />
            </Route>
        </Routes>
    )
}

export default App
