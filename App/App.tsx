import React, { FC } from 'react'

// router
import { Routes, Route } from 'react-router-dom'

// style
import './style/base.scss'

// components
import Dashboard from './pages/Dashboard'

const App: FC = () => {
    return (
        // /admin/*
        <Routes>
            <Route path='/' element={<Dashboard />} />
            {/* <Route path='/login/' element={<Login />} /> */}
            {/* <Route path='/AppX/ModelX/IdX/' element={<Login />} /> */}
        </Routes>
    )
}

export default App
