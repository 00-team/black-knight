import React, { FC, useState } from 'react'

import { FileFieldModel, ImageFieldModel } from 'state'

import { FieldProps } from './shared'

type TImage = FC<FieldProps<ImageFieldModel>>
const ImageField: TImage = ({ field, change, ...attr }) => {
    const [Url, setUrl] = useState(
        (field.value ? field.value[1] : field.initial) || ''
    )

    const [Uploading, setIsUploading] = useState({
        isUploading: false,
        hasUploaded: false,
        progress: 0,
    })
    setIsUploading
    return (
        <div {...attr} className={'image-field ' + (attr.className || '')}>
            {Uploading.hasUploaded && <img src={Url} />}
            <label htmlFor='image-upload'>
                Drag & Drop your files Or{' '}
                <span className='browse'>
                    <div className='holder'> Click Here</div>
                </span>
            </label>
            <input
                id='image-upload'
                type='file'
                accept='image/*'
                onChange={e => {
                    if (!e.target.files) return
                    const file = e.target.files[0]
                    if (!file) return

                    setUrl(URL.createObjectURL(file))
                    change(file)
                }}
            />
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

export { ImageField, FileField }
