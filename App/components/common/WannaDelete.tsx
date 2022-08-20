import React from 'react'

import { AiOutlineInfoCircle } from '@react-icons/all-files/ai/AiOutlineInfoCircle'

import './style/wannadelete.scss'

const WannaDelete = () => {
    return (
        <div className='wana-delete_container'>
            <div className='wana-delete_wrapper'>
                <div className='wana-icon'>
                    <AiOutlineInfoCircle size={50} />
                </div>
                <div className='wana-title title_small'>Are You Sure?</div>
                <div className='wana-description title_smaller'>
                    are you sure you want to delete this instant?
                </div>
                <div className='actions-wrapper'>
                    <button className='delete-action'>delete</button>
                    <button className='cancle-action'>cancle</button>
                </div>
            </div>
        </div>
    )
}

export default WannaDelete
