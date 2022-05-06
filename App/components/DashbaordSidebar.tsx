import React from 'react'

// style
import './style/sidebar.scss'

const DashboardSidebar = () => {
    return (
        <div className='sidebar-container'>
            <div className='sidebar-header title'>
                <span>Dashboard</span>
            </div>
            <div className='sidebar-wrapper'>
                <div className='sidebar-category-wrappper'>
                    <div className='category title_small'>
                        <span>Category 1</span>
                    </div>
                    <div className='column description'>
                        <div className='icon'></div>
                        <div className='holder'>Users</div>
                    </div>
                    <div className='column description'>
                        <div className='icon'></div>
                        <div className='holder'>Users</div>
                    </div>
                </div>
                <div className='sidebar-category-wrappper'>
                    <div className='category title_small'>
                        <span>Category 2</span>
                    </div>
                    <div className='column description'>
                        <div className='icon'></div>
                        <div className='holder'>Users</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardSidebar
