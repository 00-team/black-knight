import React from 'react'

// style
import './style/header.scss'

// icons
import { FaSortDown } from '@react-icons/all-files/fa/FaSortDown'

// imgs
const default_img = require('../static/imgs/default_male.png')

const DashboardHeader = () => {
    return (
        <div className='dashboard-header'>
            <div className='active-section title_small'>--ACTIVE SECTION--</div>
            <div className='user-section'>
                <div className='user-section-wrapper'>
                    <div className='profile-img'>
                        <img src={default_img} alt='' />
                    </div>
                    <div className='dropdown-icon'>
                        <FaSortDown size={24} />
                    </div>
                </div>
                <div className='dropdown'></div>
            </div>
        </div>
    )
}

export default DashboardHeader
