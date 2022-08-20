import React from 'react'

import './style/wannadelete.scss'

const WannaDelete = () => {
    return (
        <div className='wana-delete_container'>
            <div className='wana-delete_wrapper'>
                <div className='button'>
                    <span className='button-text'>Press</span>
                    <div className='button-backgrounds'>
                        <div className='button-circle button-circle1'></div>
                        <div className='button-circle button-circle2'></div>
                        <div className='button-circle button-circle3'></div>
                        <div className='button-circle button-circle4'></div>
                    </div>
                </div>
            </div>

            <div className='wrapper'>
                <div className='popup'>
                    <div className='popup-inside'>
                        <div className='backgrounds'>
                            <div className='background'></div>
                            <div className='background background2'></div>
                            <div className='background background3'></div>
                            <div className='background background4'></div>
                            <div className='background background5'></div>
                            <div className='background background6'></div>
                        </div>
                    </div>
                    <div className='content'>inner content</div>
                </div>
            </div>
        </div>
    )
}

export default WannaDelete
