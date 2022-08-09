import React, { FC, useRef, useState } from 'react'

import { ImCross } from '@react-icons/all-files/im/ImCross'

import { FileFieldModel, FilePathFieldModel, ImageFieldModel } from 'state'

import { ChoicesField, FieldProps } from './shared'

type TImage = FC<FieldProps<ImageFieldModel>>
const ImageField: TImage = ({ field, change, ...attr }) => {
    const input = useRef<HTMLInputElement>(null)
    const HTML_ID = `IMAGE_${field.name}`
    const [Url, setUrl] = useState(
        (field.value ? field.value[1] : field.initial) || ''
    )

    const clear = () => {
        setUrl('')
        change('')
        if (input.current) input.current.value = ''
    }

    const update = (files: FileList | null) => {
        if (!files || !files[0]) return
        const file = files[0]
        setUrl(URL.createObjectURL(file))
        change(file)
    }

    return (
        <div
            {...attr}
            className={'image-field ' + (attr.className || '')}
            onDrop={e => {
                e.preventDefault()
                clear()
                update(e.dataTransfer.files)
            }}
            onDragOver={e => {
                e.preventDefault()
                e.dataTransfer.dropEffect = 'move'
            }}
        >
            <label htmlFor={HTML_ID}>
                <span>
                    Drag & Drop your files Or{' '}
                    <span className='browse'>Click Here</span>
                </span>
                {Url && (
                    <div className='img-container'>
                        <img src={Url} />
                        {!field.required && (
                            <div
                                className='cross icon'
                                onClick={e => {
                                    e.preventDefault()
                                    e.stopPropagation()

                                    clear()
                                }}
                            >
                                <ImCross
                                    className='icon'
                                    size={40}
                                    fill={'#e20338'}
                                />
                            </div>
                        )}
                    </div>
                )}
            </label>
            <input
                id={HTML_ID}
                type='file'
                accept='image/*'
                ref={input}
                onChange={e => update(e.target.files)}
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
