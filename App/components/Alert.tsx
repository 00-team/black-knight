import React, { FC } from 'react'

import { TemplateProps } from '@00-team/react-alert'

import './style/alert.scss'

const Alert: FC<TemplateProps> = ({ message, close, options }) => {
    return (
        <div className={`alert-container ${options.type}`}>
            <span>{message}</span>
            <button onClick={close}>XXX</button>
        </div>
    )
}
export { Alert }
