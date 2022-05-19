import React, { FC } from 'react'

import { useAtom } from 'jotai'
import { AdminAtom } from 'state'

import './style/sidebar.scss'

import default_icon from 'static/icons/hexagon.svg'

const Sidebar: FC = () => {
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
                            <div className='column description' key={index}>
                                <div className='icon'>
                                    <img src={model.icon || default_icon} />
                                </div>
                                <div className='holder'>{model.name}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
