import React, { FC } from 'react'

import './style/progressbar.scss'

interface ProgressBarProps {
    progress: number
}

const ProgressBar: FC<ProgressBarProps> = ({ progress }) => {
    return (
        <div className='progress_bar-container'>
            <div id='progress_bar' style={{ width: progress + '%' }}></div>
            <span>%{progress}</span>
        </div>
    )
}

export default ProgressBar
