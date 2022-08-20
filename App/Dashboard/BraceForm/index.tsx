import React, { FC, useEffect, useState } from 'react'

import { BsFillExclamationCircleFill } from '@react-icons/all-files/bs/BsFillExclamationCircleFill'
import { FaNewspaper } from '@react-icons/all-files/fa/FaNewspaper'

import { Navigate, useParams } from 'react-router-dom'

import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
    BFErrorsAtom,
    BFSData,
    BraceFormAtom,
    FieldModel,
    FieldsetModel,
} from 'state'

import { Intersect, Loading, RenderField } from 'comps'
import WannaDelete from 'comps/common/WannaDelete'

import { Footer } from './Footer'
import Progress from './Progress'

import './style/form.scss'

const BraceForm: FC = () => {
    const { app_label, model_name, pk } = useParams()
    const [Form, UpdateForm] = useAtom(BraceFormAtom)

    const [wantTo, setWantTo] = useState(false)

    const UpdateSubmitData = useSetAtom(BFSData)

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
    if (Form === 'not-found') {
        return <Navigate to='not-found/' />
    }

    return (
        <div className='brace-form-container'>
            <FormTitle />
            <Progress />

            {wantTo && <WannaDelete />}

            <div className='form-data'>
                {Form.fieldsets.map((fieldset, index) => (
                    <Fieldset fieldset={fieldset} key={index} />
                ))}
            </div>

            <Footer setWantTo={setWantTo} />
        </div>
    )
}

const FormTitle: FC = () => {
    const { model_name, pk } = useParams()
    const [Form] = useAtom(BraceFormAtom)

    const title = () => {
        if (pk === undefined) return `Add ${model_name}`
        if (Form === 'loading' || Form === 'not-found') return `Change ${pk}`
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
    if (Errors && Errors.fields) error = Errors.fields[field.name]

    return (
        <Intersect className='fieldset-field'>
            <div className='error-container'>
                {error && (
                    <div className='error'>
                        <div className='icon'>
                            <BsFillExclamationCircleFill />
                        </div>
                        <div className='holder'> {error}</div>
                    </div>
                )}
            </div>
            <div className='data'>
                <label className='label title_small'>{field.label}</label>
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
