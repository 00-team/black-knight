import React from 'react'

// before you code; lets discuss about the general layout and other stuff.

// style
import './style/dashboard.scss'

// sections
import DashboardSidebar from 'comps/DashbaordSidebar'
import DashboardData from 'comps/DashboardData'
import DashboardHeader from 'comps/DashboardHeader'

const Dashboard = () => {
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
