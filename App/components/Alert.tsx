import React, { FC } from 'react'

import { TemplateProps } from '@00-team/react-alert'

const Alert: FC<TemplateProps> = ({ message, options }) => {
    return (
        <div className='alert-container'>
            {message} - {options.type}
        </div>
    )
}
export { Alert }
