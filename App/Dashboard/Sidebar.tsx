import React, { FC, useEffect } from 'react'

import { Link } from 'react-router-dom'

import { useAtom } from 'jotai'
import { AdminAtom } from 'state'

import './style/sidebar.scss'

import default_icon from 'static/icons/hexagon.svg'

const Sidebar: FC = () => {
    const [{ apps, apps_permission }] = useAtom(AdminAtom)

    useEffect(() => {
        if (apps_permission === false) {
            ReactAlert.error(
                'You don’t have permission to view or edit anything.'
            )
        }
    }, [apps_permission])

    return (
        <div className='sidebar-container'>
            <div className='sidebar-wrapper'>
                {apps.map((app, index) => (
                    <div className='sidebar-category-wrappper' key={index}>
                        <div className='category title_small'>
                            <span>{AppName(app.name)}</span>
                        </div>

                        {app.models.map((model, index) => (
                            <div className='column title_smaller' key={index}>
                                {model.perms.view || model.perms.change ? (
                                    <Link
                                        to={`${app.app_label}/${model.name}/`}
                                        className='right-side'
                                    >
                                        <div className='icon'>
                                            <img
                                                src={model.icon || default_icon}
                                            />
                                        </div>
                                        <div className='holder'>
                                            {model.plural_name}
                                        </div>
                                    </Link>
                                ) : (
                                    <div className='right-side'>
                                        <div className='icon'>
                                            <img
                                                src={model.icon || default_icon}
                                            />
                                        </div>
                                        <div className='holder'>
                                            {model.plural_name}
                                        </div>
                                    </div>
                                )}
                                <div className='left-side'>
                                    {model.perms.add && (
                                        <AddSvg
                                            link={`${app.app_label}/${model.name}/add`}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

const AppName = (s: string) => {
    let ls = s.split(' ')
    if (ls.length > 1) return ls[0] + ' ...'
    return s
}

export default Sidebar

interface AddSvg {
    link: string
}

const AddSvg: FC<AddSvg> = ({ link }) => {
    return (
        <Link to={link} className='add-container'>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='15'
                height='15'
                viewBox='0 0 1792 1792'
            >
                <path
                    fill='#70bf2b'
                    d='M1600 796v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z'
                />
            </svg>
        </Link>
    )
}
