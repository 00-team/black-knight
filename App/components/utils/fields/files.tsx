import React, { FC, useState } from 'react'

import { C } from '@00-team/utils'

import { ImCross } from '@react-icons/all-files/im/ImCross'

import { FileFieldModel, FilePathFieldModel, ImageFieldModel } from 'state'

import ProgressBar from 'comps/common/ProgressBar'

import { ChoicesField, FieldProps } from './shared'

type TImage = FC<FieldProps<ImageFieldModel>>
const ImageField: TImage = ({ field, change, ...attr }) => {
    const [Url, setUrl] = useState(
        (field.value ? field.value[1] : field.initial) || ''
    )

    const [DragNDrop, setDragNDrop] = useState({
        isDragging: false,
        isDropped: false,
    })
    DragNDrop
    const [Uploading, setIsUploading] = useState({
        isUploading: false,
        hasUploaded: false,
        progress: 0,
    })

    const DropHandler = (e: React.DragEvent<HTMLLabelElement>): void => {
        setDragNDrop({ isDropped: true, isDragging: false })
        e.preventDefault()

        if (!e.dataTransfer.files[0]) return
        // start uploading file to back-end
        setIsUploading({ ...Uploading, isUploading: true, hasUploaded: false })

        const file = e.dataTransfer.files[0]

        console.log(file)

        // debug
        setTimeout(() => {
            setIsUploading({ ...Uploading, hasUploaded: true })
            change(file)
            setUrl(URL.createObjectURL(file))
        }, 2000)
    }

    document.body.ondragenter = () => {
        setDragNDrop({ isDragging: true, isDropped: false })
        change('')
        setUrl('')
        setIsUploading({ ...Uploading, hasUploaded: false })
    }

    return (
        <div
            {...attr}
            className={
                'image-field ' +
                (attr.className || '') +
                C(DragNDrop.isDragging, 'animate')
            }
        >
            <label
                htmlFor='image-upload'
                onDragEnter={e => {
                    e.preventDefault()
                }}
                onDrop={e => DropHandler(e)}
                tabIndex={1}
                onDragOver={e => {
                    e.stopPropagation()
                    e.preventDefault()
                }}
            >
                Drag & Drop your files Or{' '}
                <span className='browse'>
                    <div className='holder'> Click Here</div>
                </span>
                {Uploading.isUploading && (
                    <div className='loading-bar'>
                        <ProgressBar progress={Uploading.progress} />
                    </div>
                )}
            </label>
            <input
                id='image-upload'
                type='file'
                accept='image/*'
                onChange={e => {
                    if (!e.target.files) return
                    setIsUploading({
                        ...Uploading,
                        isUploading: true,

                        // DEBUG
                        progress: 50,
                        // DEBUG-END
                    })

                    // send file to back end and use state to change progress bar

                    if (Uploading.progress === 100) {
                        setIsUploading({
                            ...Uploading,
                            progress: 0,
                            hasUploaded: true,
                        })
                    }

                    if (Uploading.hasUploaded) {
                        const file = e.target.files![0]
                        if (!file) return
                        setUrl(URL.createObjectURL(file))
                        change(file)
                    }
                }}
            />
            {Uploading.hasUploaded && (
                <div className='img-container'>
                    <img src={Url} />
                    <div
                        className='cross icon'
                        onClick={() => {
                            // reset to default
                            change('')
                            setUrl('')
                            setIsUploading({
                                hasUploaded: false,
                                isUploading: false,
                                progress: 0,
                            })
                            setDragNDrop({
                                isDragging: false,
                                isDropped: false,
                            })
                            //
                        }}
                    >
                        <ImCross className='icon' size={40} fill={'#e20338'} />
                    </div>
                </div>
            )}
        </div>
    )
}

type TFile = FC<FieldProps<FileFieldModel>>
const FileField: TFile = ({ field, change, ...attr }) => {
    return (
        <input
            {...attr}
            type='file'
            onChange={e => {
                if (!e.target.files) return
                const file = e.target.files[0]
                if (!file) return

                change(file)
            }}
        />
    )
}

type TFilePath = FC<FieldProps<FilePathFieldModel>>
const FilePathField: TFilePath = ({ field, change, ...attr }) => {
    const default_value = field.value || field.initial || undefined

    return (
        <ChoicesField<typeof field.choices[0]>
            {...attr}
            onChange={e => change(e.currentTarget.value)}
            defaultValue={default_value}
            choices={field.choices}
            get_value={c => c[0]}
            get_label={c => c[1]}
        />
    )
}

export { ImageField, FileField, FilePathField }
