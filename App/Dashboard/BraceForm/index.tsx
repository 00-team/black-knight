import React, { FC, useEffect, useRef, useState } from 'react'

import { C } from '@00-team/utils'

import { FaNewspaper } from '@react-icons/all-files/fa/FaNewspaper'

import confetti from 'canvas-confetti'
import { useParams } from 'react-router-dom'

import { useAtom } from 'jotai'
import { BFSData, BraceFormAtom, SubmitBraceForm } from 'state'

import { IsIntersectingForm, Loading, RenderField } from 'comps'

import './style/braceform.scss'

const BraceForm: FC = () => {
    const { app_label, model_name, pk } = useParams()
    const [Form, UpdateForm] = useAtom(BraceFormAtom)
    const [SubmitData, UpdateSubmitData] = useAtom(BFSData)

    const BtnsContainer = useRef<HTMLDivElement>(null)

    // const [SubmitData, setSubmitData] = useState<SubmitState>({})

    function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min
    }

    const HandleClick = () => {
        let duration = 7 * 1000
        let animationEnd = Date.now() + duration
        let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

        let interval: any = setInterval(function () {
            let timeLeft = animationEnd - Date.now()

            if (timeLeft <= 0) {
                return clearInterval(interval)
            }

            var particleCount = 50 * (timeLeft / duration)
            // since particles fall down, start a bit higher than random
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: {
                        x: randomInRange(0.1, 0.3),
                        y: Math.random() - 0.2,
                    },
                })
            )
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: {
                        x: randomInRange(0.7, 0.9),
                        y: Math.random() - 0.2,
                    },
                })
            )
        }, 250)
    }

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
                    <IsIntersectingForm key={idx0}>
                        <div className='fieldset'>
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
                            {fset.fields.map((f, idx1) => (
                                <div key={idx1} className='inp-wrappper'>
                                    <label
                                        className='label'
                                        style={{
                                            transitionDelay: `${idx1 + 1.25}s`,
                                        }}
                                    >
                                        {f.name}:
                                    </label>
                                    <div
                                        tabIndex={1}
                                        className='result-input-wrapper'
                                    >
                                        <RenderField
                                            field={f}
                                            className='result-input description'
                                            style={{
                                                transitionDelay: `${
                                                    idx1 + 1.5
                                                }s`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </IsIntersectingForm>
                ))}
            </div>

            <div
                className={'form-footer title_small' + C(iibc)}
                ref={BtnsContainer}
            >
                <button style={{ animationDelay: '0.5s' }}>
                    Save and add another
                </button>
                <button
                    style={{ animationDelay: '1.5s' }}
                    onClick={() => SubmitBraceForm(SubmitData)}
                >
                    Save and continue editing
                </button>
                <button
                    style={{ animationDelay: '1s' }}
                    className='main'
                    id='save-btn'
                    onClick={() => HandleClick()}
                >
                    Save
                </button>
            </div>
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
