import React, { FC } from 'react'

import { useAtomValue } from 'jotai'
import { BFSData, SubmitBraceForm } from 'state'

import { ShowParticles } from 'comps'

const Footer: FC = () => {
    const SubmitData = useAtomValue(BFSData)
    const Submit = () => {
        const response = SubmitBraceForm(SubmitData)
        console.log(response)
        ShowParticles()
    }

    return (
        <div className={'form-footer title_small'}>
            <button style={{ animationDelay: '0.5s' }} onClick={() => Submit()}>
                Save and add another
            </button>
            <button style={{ animationDelay: '1.5s' }} onClick={() => Submit()}>
                Save and continue editing
            </button>
            <button
                style={{ animationDelay: '1s' }}
                className='main'
                id='save-btn'
                onClick={() => Submit()}
            >
                Save
            </button>
        </div>
    )
}

export { Footer }
