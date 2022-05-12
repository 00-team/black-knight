import React from 'react'

// style
import './style/header.scss'

// icons
import { GiSoundWaves } from '@react-icons/all-files/gi/GiSoundWaves'

// imgs
const default_img = require('../static/imgs/default_male.png')

const DashboardHeader = () => {
    return (
        <div className='dashboard-header'>
            <div className='active-section title_small'>--ACTIVE SECTION--</div>
            <div className='user-section'>
                <div className='user-section-wrapper'>
                    <div className='recent-actions'>
                        <GiSoundWaves size={24} />
                    </div>
                    <div className='profile-img'>
                        <img src={default_img} alt='' />
                    </div>
                </div>
                <div className='dropdown-container'>
                    <div className='dropdown-wrapper'>
                        <div className='dropdown-column'>
                            <div className='icon'></div>
                            <div className='holder'></div>
                        </div>
                        <div className='dropdown-column'>
                            <div className='icon'></div>
                            <div className='holder'></div>
                        </div>
                        <div className='dropdown-column'>
                            <div className='icon'></div>
                            <div className='holder'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardHeader
