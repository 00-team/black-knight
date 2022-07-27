import React, { FC, useEffect, useRef, useState } from 'react'

import { C } from '@00-team/utils'

import { FaNewspaper } from '@react-icons/all-files/fa/FaNewspaper'

import { useParams } from 'react-router-dom'

import { useAtom } from 'jotai'
import { BraceFormAtom, Field } from 'state'

import { Loading, RenderValue } from 'comps'

import './style/braceform.scss'

// const confetti = require('canvas-confetti')

const BraceForm: FC = () => {
    const { app_label, model_name, pk } = useParams()
    const [Form, UpdateForm] = useAtom(BraceFormAtom)
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
        UpdateForm({
            app_label,
            model_name,
            end_url: pk === undefined ? 'add/' : `change/?pk=${pk}`,
        })
    }, [app_label, model_name, pk])

    if (Form === 'loading') return <Loading />

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
                {Form.fieldsets.map((fset, idx0) => (
                    <div key={idx0} className='fieldset'>
                        {fset.name && <h2>{fset.name}</h2>}
                        {fset.description && <p>{fset.description}</p>}
                        {fset.fields.map((f, idx1) => (
                            <div key={idx1}>
                                <label>{f.name}:</label>
                                <RenderFieldInput f={f} />
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

const RenderFieldInput: FC<{ f: Field }> = ({ f }) => {
    switch (f.type) {
        case 'unknown':
            return <>Unknown Field</>

        case 'char':
            // TODO: defaultValue is wrong!
            return <input type={'text'} defaultValue={f.value || f.default} />

        case 'date':
            const date = f.value ? f.value[1] : f.default
            return <input type={'date'} defaultValue={date} />

        case 'image':
            return <input type='file' accept='image/*' />

        case 'readonly':
            return <RenderValue v={f.value || null} />

        case 'text':
            return <textarea defaultValue={f.value || f.default} />

        case 'int':
            return (
                <input
                    type='number'
                    min={f.min}
                    defaultValue={f.value || f.default}
                />
            )

        default:
            return <></>
    }
}

export default BraceForm
