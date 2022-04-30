import React, { FC } from 'react'
import { createRoot } from 'react-dom/client'

// Main App
import App from './App'

// state
import { Provider as ReduxProvider } from 'react-redux'
import { store } from 'state'

// router
import { BrowserRouter as Router } from 'react-router-dom'

const Root: FC = () => {
    return (
        <ReduxProvider store={store}>
            <Router>
                <App />
            </Router>
        </ReduxProvider>
    )
}

createRoot(document.getElementById('root')!).render(<Root />)
