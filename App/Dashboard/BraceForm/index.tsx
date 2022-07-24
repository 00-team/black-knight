import React, { FC } from 'react'

import { FaNewspaper } from '@react-icons/all-files/fa/FaNewspaper'

import './style/braceform.scss'

// const confetti = require('canvas-confetti')

// debug
const modelName = 'Blog'

const BraceForm: FC = () => {
    const HandleClick = () => {}
    return (
        <div className='brace_form-container'>
            <div className='form-title title'>
                <span>
                    <div className='icon'>
                        <FaNewspaper size={30} />
                    </div>
                    <div className='holder'>Add {modelName}</div>
                    <div className='icon'>
                        <FaNewspaper size={30} />
                    </div>
                </span>
            </div>
            <div className='form-data'></div>
            <div className='form-footer'>
                <button
                    className='main'
                    id='save-btn'
                    onClick={() => HandleClick()}
                >
                    Save
                </button>
                <button>Save and continue editing</button>
                <button>Save and add another</button>
            </div>
        </div>
    )
}

export default BraceForm
