import React, { FC } from 'react'

import SearchInput from 'comps/SearchInput'

import './style/data.scss'

interface DashboardDataProps {
    SectionActive: string
}

const DashboardData: FC<DashboardDataProps> = ({ SectionActive }) => {
    return (
        <>
            {SectionActive === '' && (
                <div className='dashboard-data no-section title'>
                    <span style={{ animationDelay: '0' }}>P</span>
                    <span style={{ animationDelay: '0.5s' }}>l</span>
                    <span style={{ animationDelay: '1s' }}>e</span>
                    <span style={{ animationDelay: '1.5s' }}>a</span>
                    <span style={{ animationDelay: '2s' }}>s</span>
                    <span style={{ animationDelay: '2.5s' }}>e</span>
                    <span className='space'></span>
                    <span style={{ animationDelay: '3s' }}>S</span>
                    <span style={{ animationDelay: '3.5s' }}>e</span>
                    <span style={{ animationDelay: '4s' }}>l</span>
                    <span style={{ animationDelay: '4.5s' }}>e</span>
                    <span style={{ animationDelay: '5s' }}>c</span>
                    <span style={{ animationDelay: '5.5s' }}>t</span>
                    <span className='space'></span>
                    <span style={{ animationDelay: '6s' }}>A</span>
                    <span className='space'></span>
                    <span style={{ animationDelay: '6.5s' }}>M</span>
                    <span style={{ animationDelay: '7s' }}>o</span>
                    <span style={{ animationDelay: '7.5s' }}>d</span>
                    <span style={{ animationDelay: '8s' }}>e</span>
                    <span style={{ animationDelay: '8.5s' }}>l</span>
                </div>
            )}
            {SectionActive !== '' && (
                <div className='dashboard-data'>
                    <div className='data-header'>
                        <div className='search-container'>
                            <SearchInput />
                        </div>
                        <div className='options-wrapper'></div>
                    </div>
                    <div className='data-wrapper'>
                        <div className='add-wrapper'></div>
                        <div className='filter-wrapper'></div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DashboardData
