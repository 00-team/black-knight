import React, { FC } from 'react'

import { Routes, Route } from 'react-router-dom'

import Dashboard from 'Dashboard'
import Login from 'Login'

import './style/base.scss'

const App: FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login/' element={<Login />} />
            {/* <Route path='/AppX/ModelX/IdX/' element={<ModelX />} /> */}
        </Routes>
    )
}

export default App
