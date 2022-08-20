import React, { FC } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
    BFErrorsAtom,
    BFSData,
    BraceFormAtom,
    SubmitBraceForm,
    SubmitProgressAtom,
} from 'state'

import { ShowParticles } from 'comps'

import './style/footer.scss'

interface FooterProps {
    setWantTo: (wanaDelete: boolean) => void
}

const Footer: FC<FooterProps> = ({ setWantTo }) => {
    const SubmitData = useAtomValue(BFSData)
    const navigate = useNavigate()
    const { app_label, model_name, pk } = useParams()
    const [BFErrors, UpdateBFErrors] = useAtom(BFErrorsAtom)
    const UpdateForm = useSetAtom(BraceFormAtom)
    const UpdateProgress = useSetAtom(SubmitProgressAtom)

    const Submit = async () => {
        const response = await SubmitBraceForm(SubmitData, UpdateProgress)
        if (response.ok) {
            ShowParticles()
            if (BFErrors) UpdateBFErrors(null)
            return { ok: true, pk: response.pk }
        } else {
            UpdateBFErrors(response)
            return { ok: false }
        }
    }

    const SaveAdd = async () => {
        const { ok } = await Submit()
        if (ok) {
            if (pk) navigate('../add')
            // TODO: clear the submit form
            // for now
            else location.reload()
        }
    }

    const SaveContinue = async () => {
        const res = await Submit()
        if (res.ok) {
            if (pk) UpdateForm({ app_label, model_name, pk: res.pk })
            else navigate(`../change/${res.pk}`)
        }
    }

    const DeleteInstance = async () => {
        if (!pk || !app_label || !model_name) return

        const response = await SubmitBraceForm({
            app_label,
            model_name,
            pk,
            type: 'delete',
        })
        if (response.ok) {
            ReactAlert.success('Instance deleted')
            navigate('..')
        } else ReactAlert.error("Couldn't delete instance")
    }
    DeleteInstance

    return (
        <div className='footer title_smaller'>
            {pk && (
                <div className='delete-container'>
                    <button className='delete' onClick={() => setWantTo(true)}>
                        DELETE
                    </button>
                </div>
            )}
            <button style={{ animationDelay: '0.5s' }} onClick={SaveAdd}>
                Save and add another
            </button>
            <button style={{ animationDelay: '1.5s' }} onClick={SaveContinue}>
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
