import React, { FC } from 'react'

import { FaTrashAlt } from '@react-icons/all-files/fa/FaTrashAlt'

import { useNavigate, useParams } from 'react-router-dom'

import { SubmitBraceForm } from 'state'

import './style/wannadelete.scss'

interface WannaDeleteProps {
    setWantTo: (wantTo: boolean) => void
}

const WannaDelete: FC<WannaDeleteProps> = ({ setWantTo }) => {
    const navigate = useNavigate()
    const { app_label, model_name, pk } = useParams()

    const DeleteInstance = async () => {
        if (!pk || !app_label || !model_name) return

        const response = await SubmitBraceForm({
            app_label,
            model_name,
            pk,
            type: 'delete',
        })
        if (response.ok) {
            navigate('..')
        } else ReactAlert.error("Couldn't delete instance")
    }
    return (
        <div className='wana-delete_container'>
            <div className='wana-delete_wrapper'>
                <div className='wana-icon'>
                    <FaTrashAlt size={42} />
                </div>
                <div className='wana-title title_small'>Are You Sure?</div>
                <div className='wana-description title_smaller'>
                    are you sure you want to delete this instant?
                </div>
                <div className='actions-wrapper'>
                    <button
                        className='delete-action delete'
                        style={{ animationDelay: '1.5s' }}
                        onClick={DeleteInstance}
                    >
                        delete
                    </button>
                    <button
                        className='cancle-action'
                        style={{ animationDelay: '1s' }}
                        onClick={() => setWantTo(false)}
                    >
                        cancle
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WannaDelete
