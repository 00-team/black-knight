import React, { FC, useEffect } from 'react'

// style
import './style/dashboard.scss'

// sections
import DashboardSidebar from 'comps/DashbaordSidebar'
import DashboardData from 'comps/DashboardData'
import DashboardHeader from 'comps/DashboardHeader'

// state
import { useAtom } from 'jotai'
import { UserAtom } from 'state'

const Dashboard: FC = () => {
    const [user, update] = useAtom(UserAtom)

    useEffect(() => {
        console.log('user:', user.username)
    }, [user])

    useEffect(() => {
        update()
    }, [])

    return (
        <div className='dashboard-container'>
            <DashboardHeader />
            <div className='dashboard-wrapper'>
                <DashboardSidebar />
                <DashboardData />
            </div>
        </div>
    )
}

export default Dashboard
