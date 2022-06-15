import React, { FC, useEffect } from 'react'

import { useAtom } from 'jotai'
import { AdminAtom, UserAtom } from 'state'

import Header from './Header'
import Maniac from './Maniac'
import Sidebar from './Sidebar'

import './style/index.scss'

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
                <Maniac />
            </div>
        </div>
    )
}

export default Dashboard
