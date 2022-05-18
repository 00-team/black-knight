import React, { useState } from 'react'

// style
import './style/header.scss'

// icons
import { GiSoundWaves } from '@react-icons/all-files/gi/GiSoundWaves'

import { VscGlobe } from '@react-icons/all-files/vsc/VscGlobe'
import { RiLockPasswordLine } from '@react-icons/all-files/ri/RiLockPasswordLine'
// import { BiLogOut } from '@react-icons/all-files/bi/BiLogOut'

import { LogoutButton } from 'comps/buttons'

// imgs
import default_img from '../static/imgs/default_male.png'

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
                        <div className='slide-container  title_smaller'>
                            <div className='menu-wrapper slide'>
                                <div className='dropdown-header title_smaller'>
                                    Welcome
                                    <span className='username'>
                                        Sadra Taghavi
                                    </span>
                                </div>
                                <div className='dropdown-columns'>
                                    <div className='dropdown-column'>
                                        <div className='icon'>
                                            <div className='before'>
                                                <VscGlobe size={24} />
                                            </div>
                                            <div className='after'>
                                                <VscGlobe size={24} />
                                            </div>
                                        </div>
                                        <div className='holder'>View Site</div>
                                    </div>
                                    <div className='dropdown-column'>
                                        <div className='icon'>
                                            <div className='before'>
                                                <RiLockPasswordLine size={24} />
                                            </div>
                                            <div className='after'>
                                                <RiLockPasswordLine size={24} />
                                            </div>
                                        </div>
                                        <div className='holder'>
                                            Change Password
                                        </div>
                                    </div>
                                </div>
                                {/* <div className='dropdown-logout'>
                                    <div className='icon'>
                                        <BiLogOut size={24} />
                                    </div>
                                    <div className='holder'>Logout</div>
                                </div> */}
                                <LogoutButton />
                            </div>
                            <div className='recent-wrapper slide'>
                                <div className='dropdown-header title_smaller'>
                                    dsadadaddsa
                                </div>
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
            </div>
        </div>
    )
}

export default DashboardHeader
