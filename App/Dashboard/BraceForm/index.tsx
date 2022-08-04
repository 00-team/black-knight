import React, { FC, useEffect } from 'react'

import { FaNewspaper } from '@react-icons/all-files/fa/FaNewspaper'

import { useParams } from 'react-router-dom'

import { useAtom, useAtomValue } from 'jotai'
import {
    BFErrorsAtom,
    BFSData,
    BraceFormAtom,
    FieldModel,
    FieldsetModel,
} from 'state'

import { Intersect, Loading, RenderField } from 'comps'

import { Footer } from './Footer'

import './style/form.scss'

const BraceForm: FC = () => {
    const { app_label, model_name, pk } = useParams()
    const [Form, UpdateForm] = useAtom(BraceFormAtom)

    const [, UpdateSubmitData] = useAtom(BFSData)

    useEffect(() => {
        if (!app_label || !model_name) return
        UpdateForm({ app_label, model_name, pk })
        UpdateSubmitData({
            app_label,
            model_name,
            pk,
            type: pk === undefined ? 'add' : 'change',
        })
    }, [app_label, model_name, pk])

    if (Form === 'loading') return <Loading />

    return (
        <div className='brace-form-container'>
            <FormTitle />

            <div className='form-data'>
                {Form.fieldsets.map((fieldset, index) => (
                    <Fieldset fieldset={fieldset} key={index} />
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

const Fieldset: FC<{ fieldset: FieldsetModel }> = ({ fieldset }) => {
    return (
        <div className='fieldset'>
            <Intersect className='fieldset-header'>
                {fieldset.name && (
                    <h2 className='fieldset-title title'>
                        <div>{fieldset.name}</div>
                    </h2>
                )}
                {fieldset.description && (
                    <p className='fieldset-description title_small'>
                        {fieldset.description}
                    </p>
                )}
            </Intersect>

            {fieldset.fields.map((field, index) => (
                <Field field={field} key={index} />
            ))}
        </div>
    )
}

const Field: FC<{ field: FieldModel }> = ({ field }) => {
    const Errors = useAtomValue(BFErrorsAtom)
    let error: string | undefined
    if (Errors) error = Errors.fields[field.name]

    return (
        <Intersect className='fieldset-field'>
            {error && <span className='error'>{error}</span>}
            <div className='data'>
                <label className='label'>{field.label}</label>
                <div tabIndex={1} className='result-input-wrapper'>
                    <RenderField
                        field={field}
                        className='result-input description'
                        style={{
                            transitionDelay: '0.5s',
                        }}
                    />
                </div>
            </div>
        </Intersect>
    )
}

export default BraceForm
