import React, { FC } from 'react'

import { useAtom } from 'jotai'
import { AdminAtom } from 'state'

import './style/sidebar.scss'

import default_icon from 'static/icons/hexagon.svg'

interface SidebarProps {
    setSectionActive: (isActivie: boolean) => void
}

const Sidebar: FC<SidebarProps> = ({ setSectionActive }) => {
    const [{ apps }] = useAtom(AdminAtom)

    return (
        <div className='sidebar-container'>
            <div className='sidebar-wrapper'>
                {apps.map((app, index) => (
                    <div className='sidebar-category-wrappper' key={index}>
                        <div className='category title_small'>
                            <span>{app.name}</span>
                        </div>

                        {app.models.map((model, index) => (
                            <div
                                className='column title_smaller'
                                onClick={() => setSectionActive(true)}
                                key={index}
                            >
                                <div className='right-side'>
                                    <div className='icon'>
                                        <img src={model.icon || default_icon} />
                                    </div>
                                    <div className='holder'>{model.name}</div>
                                </div>
                                <div className='left-side'>
                                    <AddSvg />
                                    <DeleteSvg />
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar

const AddSvg = () => {
    return (
        <div className='add-container'>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='13'
                height='13'
                viewBox='0 0 1792 1792'
            >
                <path
                    fill='#70bf2b'
                    d='M1600 796v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z'
                />
            </svg>
        </div>
    )
}

const DeleteSvg = () => {
    return (
        <div className='delete-container'>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='13'
                height='13'
                viewBox='0 0 1792 1792'
            >
                <path
                    fill='#efb80b'
                    d='M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z'
                />
            </svg>
        </div>
    )
}
