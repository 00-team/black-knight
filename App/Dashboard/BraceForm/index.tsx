import React, { FC } from 'react'

import { FaNewspaper } from '@react-icons/all-files/fa/FaNewspaper'

import './style/braceform.scss'

// debug
const modelName = 'Blog'

const BraceForm: FC = () => {
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
        </div>
    )
}

export default BraceForm
