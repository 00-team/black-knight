import React, { FC } from 'react'

import { C } from '@00-team/utils'

import { BsPlus } from '@react-icons/all-files/bs/BsPlus'
import { GiSoundWaves } from '@react-icons/all-files/gi/GiSoundWaves'
import { MdDelete } from '@react-icons/all-files/md/MdDelete'
import { MdModeEdit } from '@react-icons/all-files/md/MdModeEdit'
import { RiLockPasswordLine } from '@react-icons/all-files/ri/RiLockPasswordLine'
import { VscGlobe } from '@react-icons/all-files/vsc/VscGlobe'

import { useAtom, atom } from 'jotai'
import { UserAtom } from 'state'

import { LogoutButton } from 'comps/buttons'

import './style/header.scss'

import default_img from 'static/imgs/default_male.png'

enum HeaderSection {
    PROFILE = 'PROFILE',
    RECENT = 'RECENT',
    NONE = 'NONE',
}

const SectionAtom = atom<HeaderSection>(HeaderSection.NONE)

const Header: FC = () => {
    const [Section, setSection] = useAtom(SectionAtom)

    const ChangeSection = (newSection: HeaderSection) => {
        if (newSection === Section) return setSection(HeaderSection.NONE)

        return setSection(newSection)
    }

    return (
        <div className='dashboard-header'>
            <div className='active-section title_small'>--ACTIVE SECTION--</div>
            <div className='user-section'>
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
                        <img src={default_img} alt='admin avatar' />
                    </div>
                </div>

                <DropDown />
            </div>
        </div>
    )
}

const DropDown: FC = () => {
    const [Section] = useAtom(SectionAtom)
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
                                </div>{' '}
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
                                </div>{' '}
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
