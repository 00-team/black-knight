import React, { FC } from 'react'

import './style/loading.scss'

const Loading: FC = () => {
    return (
        <div className='loading-container'>
            <div className='loading-text title_small'>JUST A SEC...</div>
            <div className='balls'>
                <div className='ball'></div>
                <div className='ball'></div>
                <div className='ball'></div>
                <div className='ball'></div>
                <div className='ball'></div>
                <div className='ball'></div>
                <div className='ball'></div>
            </div>
        </div>
    )
}

export { Loading }
