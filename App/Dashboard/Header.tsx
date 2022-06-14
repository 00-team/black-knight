import React, { FC, useRef, useState } from 'react'

import { C } from '@00-team/utils'

import { BsPlus } from '@react-icons/all-files/bs/BsPlus'
import { GiSoundWaves } from '@react-icons/all-files/gi/GiSoundWaves'
import { MdDelete } from '@react-icons/all-files/md/MdDelete'
import { MdModeEdit } from '@react-icons/all-files/md/MdModeEdit'
import { RiLockPasswordLine } from '@react-icons/all-files/ri/RiLockPasswordLine'
import { VscGlobe } from '@react-icons/all-files/vsc/VscGlobe'

import { useAtom } from 'jotai'
import { UserAtom } from 'state'

import { LogoutButton } from 'comps/buttons'

import './style/header.scss'

enum HeaderSection {
    PROFILE = 'PROFILE',
    RECENT = 'RECENT',
    NONE = 'NONE',
}

interface HeaderProps {
    sectionActive: string
}

const Header: FC<HeaderProps> = ({ sectionActive }) => {
    const [Section, setSection] = useState<HeaderSection>(HeaderSection.NONE)
    const UserSection = useRef<HTMLDivElement>(null)

    const [user] = useAtom(UserAtom)

    const ChangeSection = (newSection: HeaderSection) => {
        if (newSection === Section) return setSection(HeaderSection.NONE)

        if (Section === HeaderSection.NONE)
            document.addEventListener('click', CloseDropDown)

        return setSection(newSection)
    }

    function CloseDropDown(e: MouseEvent) {
        setSection(section => {
            if (section === HeaderSection.NONE) return section
            if (!UserSection.current) return section
            if (!(e.target instanceof Node)) return section
            if (!e.target.isConnected) return section

            if (UserSection.current.contains(e.target)) return section

            document.removeEventListener('click', CloseDropDown)
            return HeaderSection.NONE
        })
    }

    return (
        <div className='dashboard-header'>
            <div className='active-section title_small'>
                {sectionActive ? sectionActive : '--ACTIVE SECTION--'}
            </div>
            <div className='user-section' ref={UserSection}>
                <div className='user-section-wrapper'>
                    <div
                        className='recent-actions'
                        onClick={() => ChangeSection(HeaderSection.RECENT)}
                    >
                        <GiSoundWaves size={20} />
                    </div>
                    <div
                        className='avatar'
                        onClick={() => ChangeSection(HeaderSection.PROFILE)}
                    >
                        <img src={user.avatar} alt='admin avatar' />
                    </div>
                </div>

                <DropDown Section={Section} />
            </div>
        </div>
    )
}

const DropDown: FC<{ Section: HeaderSection }> = ({ Section }) => {
    const [user] = useAtom(UserAtom)

    const WrapperClass = () => {
        switch (Section) {
            case HeaderSection.PROFILE:
                return ' profile '
            case HeaderSection.RECENT:
                return ' recent '
            default:
                return ''
        }
    }

    return (
        <div
            className={
                'dropdown-overflow' +
                C(Section !== HeaderSection.NONE, 'active')
            }
        >
            <div className='dropdown-container'>
                <div className={'dropdown-wrapper' + WrapperClass()}>
                    <div className='slide-container  title_smaller'>
                        <div className='menu-wrapper slide'>
                            <div className='dropdown-header title_smaller'>
                                Welcome
                                <span className='username'>
                                    {user.username}
                                </span>
                            </div>
                            <div className='dropdown-columns'>
                                <div
                                    className='dropdown-column'
                                    onClick={() => location.assign('/')}
                                >
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
                            <LogoutButton />
                        </div>
                        <div className='recent-wrapper slide'>
                            <div className='dropdown-header title_smaller recent'>
                                Recent Actions
                            </div>
                            <div className='dropdown-column-wrapper edit'>
                                <div className='dropdown-column-header title_smaller '>
                                    <div className='icon'>
                                        <MdModeEdit fill='#efb80b' size={20} />
                                    </div>
                                    <div className='holder'>Edited</div>
                                </div>
                                <div className='dropdown-column-data description'>
                                    <span>action done</span>
                                    <span className='dot'>•</span>
                                    <span>model</span>
                                </div>
                            </div>
                            <div className='dropdown-column-wrapper add'>
                                <div className='dropdown-column-header title_smaller '>
                                    <div className='icon'>
                                        <BsPlus fill='#00dc7d' size={24} />
                                    </div>
                                    <div className='holder'>Added</div>
                                </div>

                                <div className='dropdown-column-data description'>
                                    <span>action done</span>
                                    <span className='dot'>•</span>
                                    <span>model</span>
                                </div>
                            </div>
                            <div className='dropdown-column-wrapper delete'>
                                <div className='dropdown-column-header title_smaller'>
                                    <div className='icon'>
                                        <MdDelete fill='#e20338' size={24} />
                                    </div>
                                    <div className='holder'>Deleted</div>
                                </div>

                                <div className='dropdown-column-data description'>
                                    <span>action done</span>
                                    <span className='dot'>•</span>
                                    <span>model</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
