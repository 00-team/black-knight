import React, { FC, ReactNode } from 'react'

import { BsPlus } from '@react-icons/all-files/bs/BsPlus'
import { MdDelete } from '@react-icons/all-files/md/MdDelete'
import { MdModeEdit } from '@react-icons/all-files/md/MdModeEdit'

import { LogFlag, LogModel } from 'state/models'

interface TLogData {
    className: string
    icon: ReactNode
    title: string
}

const LogAdd: TLogData = {
    className: ' add ',
    icon: <BsPlus fill='#00dc7d' size={24} />,
    title: 'Added',
}

const LogChange: TLogData = {
    className: ' edit ',
    icon: <MdModeEdit fill='#efb80b' size={20} />,
    title: 'Changed',
}

const LogDelete: TLogData = {
    className: ' delete ',
    icon: <MdDelete fill='#e20338' size={24} />,
    title: 'Deleted',
}

const GetLogData = (flag: LogFlag): TLogData => {
    switch (flag) {
        case LogFlag.ADDITION:
            return LogAdd

        case LogFlag.CHANGE:
            return LogChange

        case LogFlag.DELETION:
            return LogDelete
    }
}

const Log: FC<LogModel> = props => {
    const { flag, content_type, repr } = props
    const { icon, className, title } = GetLogData(flag)

    return (
        <div className={'dropdown-column-wrapper' + className}>
            <div className='dropdown-column-header title_smaller'>
                <div className='icon'>{icon}</div>
                <div className='holder'>{title}</div>
            </div>

            <div className='dropdown-column-data description'>
                <span>{repr}</span>
                <span className='dot'>•</span>
                <span>{content_type}</span>
            </div>
        </div>
    )
}

export default Log
