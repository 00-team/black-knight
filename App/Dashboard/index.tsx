import React, { FC, useEffect } from 'react'

import { useAtom } from 'jotai'
import { AdminAtom, UserAtom } from 'state'

import Brace from './Brace'
import Header from './Header'
import Sidebar from './Sidebar'

import './style/dashboard.scss'

const Dashboard: FC = () => {
    const [, UpdateUser] = useAtom(UserAtom)
    const [, UpdateAdmin] = useAtom(AdminAtom)

    useEffect(() => {
        UpdateUser()
        UpdateAdmin()
    }, [])

    return (
        <div className='dashboard-container'>
            <Header />
            <div className='dashboard-wrapper'>
                <Sidebar />
                <Brace />
            </div>
        </div>
    )
}

export default Dashboard
