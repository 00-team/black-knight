import React, { FC, useEffect, useRef, useState } from 'react'

import { FaNewspaper } from '@react-icons/all-files/fa/FaNewspaper'

import { useParams } from 'react-router-dom'

import { useAtom } from 'jotai'
import { BFSData, BraceFormAtom } from 'state'

import {
    IsIntersectingColumn,
    IsIntersectingHead,
    Loading,
    RenderField,
} from 'comps'

import { Footer } from './Footer'

import './style/braceform.scss'

const BraceForm: FC = () => {
    const { app_label, model_name, pk } = useParams()
    const [Form, UpdateForm] = useAtom(BraceFormAtom)

    const [, UpdateSubmitData] = useAtom(BFSData)

    const BtnsContainer = useRef<HTMLDivElement>(null)

    // const [SubmitData, setSubmitData] = useState<SubmitState>({})

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
        if (!app_label || !model_name) return
        UpdateForm({
            app_label,
            model_name,
            end_url: pk === undefined ? 'add/' : `change/?pk=${pk}`,
        })
        UpdateSubmitData({
            app_label,
            model_name,
            pk,
            type: pk === undefined ? 'add' : 'change',
        })
    }, [app_label, model_name, pk])

    if (Form === 'loading') return <Loading />

    return (
        <div className='brace_form-container'>
            <FormTitle />
            <div className='form-data'>
                {Form.fieldsets.map((fset, idx0) => (
                    <div className='fieldset' key={idx0}>
                        <IsIntersectingHead>
                            {fset.name && (
                                <h2 className='fieldset-title title'>
                                    <div>{fset.name}</div>
                                </h2>
                            )}
                            {fset.description && (
                                <p className='fieldset-description title_small'>
                                    {fset.description}
                                </p>
                            )}
                        </IsIntersectingHead>

                        {fset.fields.map((f, idx1) => (
                            <IsIntersectingColumn key={idx1}>
                                <div className='inp-wrappper'>
                                    <label className='label'>{f.name}:</label>
                                    <div
                                        tabIndex={1}
                                        className='result-input-wrapper'
                                    >
                                        <RenderField
                                            field={f}
                                            className='result-input description'
                                            style={{
                                                transitionDelay: '0.5s',
                                            }}
                                        />
                                    </div>
                                </div>
                            </IsIntersectingColumn>
                        ))}
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    )
}

const FormTitle: FC = () => {
    const { model_name, pk } = useParams()
    const [Form] = useAtom(BraceFormAtom)

    const title = () => {
        if (pk === undefined) return `Add ${model_name}`
        if (Form === 'loading') return `Change ${pk}`
        return `Change ${Form.label}`
    }

    return (
        <div className='form-title title'>
            <span>
                <div className='icon'>
                    <FaNewspaper size={30} />
                </div>
                <div className='holder'>{title()}</div>
                <div className='icon'>
                    <FaNewspaper size={30} />
                </div>
            </span>
        </div>
    )
}

export default BraceForm
