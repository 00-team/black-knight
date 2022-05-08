import React, { FC } from 'react'
import { createRoot } from 'react-dom/client'

// Main App
import App from './App'

// router
import { BrowserRouter as Router } from 'react-router-dom'

const Root: FC = () => {
    return (
        <Router basename='/admin'>
            <App />
        </Router>
    )
}

createRoot(document.getElementById('root')!).render(<Root />)
