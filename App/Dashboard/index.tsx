import React, { FC, useEffect } from 'react'

// style
import './style/index.scss'

// sections
import Sidebar from './Sidebar'
import Data from './Data'
import Header from './Header'

// state
import { useAtom } from 'jotai'
import { UserAtom, AdminAtom } from 'state'

const Dashboard: FC = () => {
    const [user, UpdateUser] = useAtom(UserAtom)
    const [admin, UpdateAdmin] = useAtom(AdminAtom)

    useEffect(() => {}, [user])
    useEffect(() => {}, [admin])

    useEffect(() => {
        UpdateUser()
        UpdateAdmin()
    }, [])

    return (
        <div className='dashboard-container'>
            <Header />
            <div className='dashboard-wrapper'>
                <Sidebar />
                <Data />
            </div>
        </div>
    )
}

export default Dashboard
