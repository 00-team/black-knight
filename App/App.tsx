import React, { FC } from 'react'

import { Routes, Route } from 'react-router-dom'

import Dashboard from 'Dashboard'
import Login from 'Login'

import './style/base.scss'

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
