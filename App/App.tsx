import React, { FC } from 'react'

// router
import { Routes, Route } from 'react-router-dom'

// style
import './style/base.scss'

// components
import Dashboard from './pages/Dashboard'

const App: FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Dashboard />} />
        </Routes>
    )
}

export default App
