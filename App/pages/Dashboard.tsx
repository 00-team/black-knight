import React from 'react'

// before you code; lets discuss about the general layout and other stuff.

// sections
import DashboardSidebar from 'comps/DashbaordSidebar'
import DashboardData from 'comps/DashboardData'

const Dashboard = () => {
    return (
        <div className='dashboard-container'>
            <DashboardSidebar />
            <DashboardData />
        </div>
    )
}

export default Dashboard
