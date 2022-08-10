import React, { FC } from 'react'
import { createRoot } from 'react-dom/client'

import { Options, Provider as AlertProvider } from '@00-team/react-alert'
import { BrowserRouter as Router } from 'react-router-dom'

import { Alert } from 'components'

import App from './App'

const Root: FC = () => {
    return (
        <AlertProvider template={Alert} options={AlertOptions}>
            <Router basename={BASE_URL}>
                <App />
            </Router>
        </AlertProvider>
    )
}

const AlertOptions: Options = {
    position: 'top right',
}

createRoot(document.getElementById('root')!).render(<Root />)
