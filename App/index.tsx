import React, { FC } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

const Root: FC = () => {
    return (
        <>
            <App />
        </>
    )
}

createRoot(document.getElementById('root')!).render(<Root />)
