import React, { useState } from 'react'

// style
import './style/header.scss'

// icons
import { GiSoundWaves } from '@react-icons/all-files/gi/GiSoundWaves'

// imgs
const default_img = require('../static/imgs/default_male.png')

const DashboardHeader = () => {
    const [ShowDropdown, setShowDropdown] = useState({
        show: false,
        section: '',
    })

    const handleDropdown = (section: string) => {
        if (section === ShowDropdown.section)
            return setShowDropdown({ show: false, section: '' })

        return setShowDropdown({ show: true, section })
    }

    return (
        <div className='dashboard-header'>
            <div className='active-section title_small'>--ACTIVE SECTION--</div>
            <div className='user-section'>
                <div className='user-section-wrapper'>
                    <div
                        className='recent-actions'
                        onClick={() => handleDropdown('recent')}
                    >
                        <GiSoundWaves size={20} />
                    </div>
                    <div
                        className='profile-img'
                        onClick={() => handleDropdown('menu')}
                    >
                        <img src={default_img} alt='' />
                    </div>
                </div>
                <div
                    className={`dropdown-container ${
                        ShowDropdown.show ? 'active' : ''
                    }`}
                >
                    <div
                        className={`dropdown-wrapper ${
                            ShowDropdown.show &&
                            ShowDropdown.section === 'recent'
                                ? 'recent'
                                : ''
                        } ${
                            ShowDropdown.show && ShowDropdown.section === 'menu'
                                ? 'menu'
                                : ''
                        }`}
                    >
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
