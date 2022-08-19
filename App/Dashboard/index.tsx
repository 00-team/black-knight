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
            <button onClick={() => ReactAlert.error('this is error')}>
                error
            </button>
            <button onClick={() => ReactAlert.success('this is success')}>
                success
            </button>
            <button onClick={() => ReactAlert.info('this is info')}>
                info
            </button>
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
