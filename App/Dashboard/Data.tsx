import React, { FC } from 'react'

import './style/data.scss'

interface DashboardDataProps {
    SectionActive: boolean
}

const DashboardData: FC<DashboardDataProps> = ({ SectionActive }) => {
    return (
        <>
            {!SectionActive && (
                <div className='dashboard-data no-section title'>
                    <span>P</span>
                    <span>l</span>
                    <span>e</span>
                    <span>a</span>
                    <span>s</span>
                    <span>e</span>
                    <span className='space'></span>
                    <span>S</span>
                    <span>e</span>
                    <span>l</span>
                    <span>e</span>
                    <span>c</span>
                    <span>t</span>
                    <span className='space'></span>
                    <span>A</span>
                    <span className='space'></span>
                    <span>M</span>
                    <span>o</span>
                    <span>d</span>
                    <span>e</span>
                    <span>l</span>
                </div>
            )}
            {SectionActive && <div className='dashboard-data'>data</div>}
        </>
    )
}

export default DashboardData
