import React, { FC, useEffect, useState } from 'react'

import { useAtom } from 'jotai'
import { AdminAtom, UserAtom } from 'state'

import Header from './Header'
import Maniac from './Maniac'
import Sidebar from './Sidebar'

import './style/index.scss'

const Dashboard: FC = () => {
    const [, UpdateUser] = useAtom(UserAtom)
    const [, UpdateAdmin] = useAtom(AdminAtom)

    const [SectionActive, setSectionActive] = useState('')

    useEffect(() => {
        UpdateUser()
        UpdateAdmin()
    }, [])

    return (
        <div className='dashboard-container'>
            <Header sectionActive={SectionActive} />
            <div className='dashboard-wrapper'>
                <Sidebar setSectionActive={setSectionActive} />
                <Maniac SectionActive={SectionActive} />
            </div>
        </div>
    )
}

export default Dashboard
