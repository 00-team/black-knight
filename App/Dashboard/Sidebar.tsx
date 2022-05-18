import React, { FC } from 'react'

// style
import './style/sidebar.scss'

const Sidebar: FC = () => {
    return (
        <div className='sidebar-container'>
            <div className='sidebar-wrapper'>
                <div className='sidebar-category-wrappper'>
                    <div className='category title_small'>
                        <span>App 1</span>
                    </div>
                    <div className='column description'>
                        <div className='icon'></div>
                        <div className='holder'>Model 1</div>
                    </div>
                    <div className='column description'>
                        <div className='icon'></div>
                        <div className='holder'>Model 2</div>
                    </div>
                </div>
                <div className='sidebar-category-wrappper'>
                    <div className='category title_small'>
                        <span>App 2</span>
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

export default Sidebar
