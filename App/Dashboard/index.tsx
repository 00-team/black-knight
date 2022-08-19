import React, { FC, Suspense, useEffect } from 'react'

import { Outlet } from 'react-router-dom'

import { useSetAtom } from 'jotai'
import { AdminAtom, UserAtom } from 'state'

import Header from './Header'
import Sidebar from './Sidebar'

import './style/dashboard.scss'

const Dashboard: FC = () => {
    const UpdateUser = useSetAtom(UserAtom)
    const UpdateAdmin = useSetAtom(AdminAtom)

    useEffect(() => {
        UpdateUser()
        UpdateAdmin()
    }, [])

    return (
        <div className='dashboard-container'>
            <Header />
            <div className='dashboard-wrapper'>
                <Sidebar />
                <div className='brace'>
                    <Suspense>
                        <Outlet />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
