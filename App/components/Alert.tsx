import React, { FC } from 'react'

import { AiFillCheckCircle } from '@react-icons/all-files/ai/AiFillCheckCircle'
import { ImCross } from '@react-icons/all-files/im/ImCross'
import { IoWarning } from '@react-icons/all-files/io5/IoWarning'
import { TiInfo } from '@react-icons/all-files/ti/TiInfo'

import { TemplateProps } from '@00-team/react-alert'

import './style/alert.scss'

const Alert: FC<TemplateProps> = ({ message, close, options }) => {
    return (
        <div className={`alert-container title_smaller ${options.type}`}>
            <div className='icon'>
                {options.type === 'success' && <AiFillCheckCircle size={24} />}
                {options.type === 'error' && <IoWarning size={24} />}
                {options.type === 'info' && <TiInfo size={24} />}
            </div>
            <span className={'holder' + options.type}>{message}</span>
            <div className='alert-close' onClick={close}>
                <ImCross size={15} />
            </div>
        </div>
    )
}
export { Alert }
