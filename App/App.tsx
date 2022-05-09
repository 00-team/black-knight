import React, { FC, useEffect } from 'react'

// router
import { Routes, Route } from 'react-router-dom'

// style
import './style/base.scss'

// components
import Dashboard from './pages/Dashboard'

// state
import { MainAtom } from 'state'
import { useAtom } from 'jotai'

const App: FC = () => {
    const [response] = useAtom(MainAtom)
    useEffect(() => {
        console.log(response)
    }, [response])

    return (
        // /admin/*
        <Routes>
            <Route path='/' element={<Dashboard />} />
            {/* <Route path='/login/' element={<Login />} /> */}
            {/* <Route path='/AppX/ModelX/IdX/' element={<ModelX />} /> */}
        </Routes>
    )
}

export default App
