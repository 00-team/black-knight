import React, { FC, useEffect, useRef, useState } from 'react'

import { C } from '@00-team/utils'

import { FaNewspaper } from '@react-icons/all-files/fa/FaNewspaper'

import { useParams } from 'react-router-dom'

import { useAtom } from 'jotai'
import { BraceFieldsetsAtom } from 'state'

import { Loading } from 'comps'

import './style/braceform.scss'

// const confetti = require('canvas-confetti')

const BraceForm: FC = () => {
    const { app_label, model_name } = useParams()
    const [Fieldsets, UpdateFieldsets] = useAtom(BraceFieldsetsAtom)
    const BtnsContainer = useRef<HTMLDivElement>(null)

    // is intersecting btns container
    const [iibc, setiibc] = useState(false)
    useEffect(() => {
        if (BtnsContainer.current && !iibc) {
            var observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry && entry.isIntersecting) {
                        setiibc(true)
                        observer.disconnect()
                    }
                },
                {
                    rootMargin: '-75px',
                }
            )

            observer.observe(BtnsContainer.current)
        }
        return () => {
            if (observer) observer.disconnect()
        }
    }, [BtnsContainer])

    useEffect(() => {
        UpdateFieldsets(`${app_label}/${model_name}`)
    }, [app_label, model_name])

    if (Fieldsets === 'loading') return <Loading />

    return (
        <div className='brace_form-container'>
            <div className='form-title title'>
                <span>
                    <div className='icon'>
                        <FaNewspaper size={30} />
                    </div>
                    <div className='holder'>Add {model_name}</div>
                    <div className='icon'>
                        <FaNewspaper size={30} />
                    </div>
                </span>
            </div>
            <div className='form-data'>
                {Fieldsets.fieldsets.map((fset, idx0) => (
                    <div key={idx0}>
                        {fset.name && <h2>{fset.name}</h2>}
                        {fset.description && <p>{fset.description}</p>}
                        {fset.fields.map((f, idx1) => (
                            <div key={idx1}>
                                <label>{f.name}</label>
                                {f.type === 'unknown' ? (
                                    <span>Unknown Field</span>
                                ) : f.type === 'char' ? (
                                    <input
                                        type='text'
                                        maxLength={f.max}
                                        defaultValue={f.default?.toString()}
                                    />
                                ) : f.type === 'image' ? (
                                    <input type='file' />
                                ) : (
                                    <>gg ez</>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div
                className={'form-footer title_small' + C(iibc, 'active')}
                ref={BtnsContainer}
            >
                <button style={{ animationDelay: '0.5s' }}>
                    Save and add another
                </button>
                <button style={{ animationDelay: '1.5s' }}>
                    Save and continue editing
                </button>
                <button
                    style={{ animationDelay: '1s' }}
                    className='main'
                    id='save-btn'
                    onClick={() => {}}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default BraceForm
