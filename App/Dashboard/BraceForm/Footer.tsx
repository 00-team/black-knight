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
    const [BraceForm, UpdateForm] = useAtom(BraceFormAtom)
    const UpdateProgress = useSetAtom(SubmitProgressAtom)

    const Submit = async () => {
        const response = await SubmitBraceForm(SubmitData, UpdateProgress)
        if (response.ok) {
            ShowParticles()
            if (BFErrors) UpdateBFErrors(null)
            ReactAlert.success('Your instance had been saved')
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

    const Save = async (nav: boolean = true) => {
        const res = await Submit()
        if (res.ok) {
            if (nav) navigate('..')
            else location.reload()
        }
    }

    if (BraceForm === 'loading' || BraceForm === 'not-found') return <></>

    const { add, change, delete: DeletePerm, view } = BraceForm.perms

    if (!add && !change && !DeletePerm) return <></>

    return (
        <div className='footer title_smaller'>
            {pk && DeletePerm && (
                <div className='delete-container'>
                    <button className='delete' onClick={() => setWantTo(true)}>
                        DELETE
                    </button>
                </div>
            )}
            {!pk && add && (
                <button style={{ animationDelay: '0.5s' }} onClick={SaveAdd}>
                    Save and add another
                </button>
            )}
            {change && (
                <button
                    style={{ animationDelay: '1.5s' }}
                    onClick={SaveContinue}
                >
                    Save and continue editing
                </button>
            )}
            {((!pk && add) || change) && (
                <button
                    style={{ animationDelay: '1s' }}
                    className='main'
                    id='save-btn'
                    onClick={() => Save(change || view)}
                >
                    Save
                </button>
            )}
        </div>
    )
}

export { Footer }
