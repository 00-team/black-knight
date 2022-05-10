import React from 'react'

// style
import './style/header.scss'

// icons
import { MdTimeline } from '@react-icons/all-files/md/MdTimeline'

// imgs
const default_img = require('../static/imgs/default_male.png')

const DashboardHeader = () => {
    return (
        <div className='dashboard-header'>
            <div className='active-section title_small'>--ACTIVE SECTION--</div>
            <div className='user-section'>
                <div className='user-section-wrapper'>
                    <div className='recent-actions'>
                        <MdTimeline size={24} />
                    </div>
                    <div className='profile-img'>
                        <img src={default_img} alt='' />
                    </div>
                </div>
                <div className='dropdown-container'></div>
            </div>
        </div>
    )
}

export default DashboardHeader
