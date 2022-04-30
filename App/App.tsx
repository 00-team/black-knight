import React, { FC } from 'react'

// router
import { Routes, Route } from 'react-router-dom'

// style
import './style/base.scss'

const App: FC = () => {
    return (
        <Routes>
            <Route path='/' element={<>GG</>} />
        </Routes>
    )
}

export default App
