import React, { FC, useEffect } from 'react'

import { useAtom } from 'jotai'
import { AdminAtom, UserAtom } from 'state'

import Data from './Data'
import Header from './Header'
import Sidebar from './Sidebar'

import './style/index.scss'

const Dashboard: FC = () => {
    const [user, UpdateUser] = useAtom(UserAtom)
    const [admin, UpdateAdmin] = useAtom(AdminAtom)

    useEffect(() => {}, [user])
    useEffect(() => {}, [admin])

    useEffect(() => {
        UpdateUser()
        UpdateAdmin()
    }, [])

    return (
        <div className='dashboard-container'>
            <Header />
            <div className='dashboard-wrapper'>
                <Sidebar />
                <Data />
            </div>
        </div>
    )
}

export default Dashboard
