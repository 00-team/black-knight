import React, { FC } from 'react'

import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import {
    CharBasedFieldsModel,
    JsonFieldModel,
    MarkDownFieldModel,
    TextFieldModel,
} from 'state'

import { ChoicesField, FieldProps } from './shared'

import './style/markdown.scss'

type TChar = FC<FieldProps<CharBasedFieldsModel>>
const CharField: TChar = ({ field, change, ...attr }) => {
    if (field.choices) {
        return (
            <ChoicesField<typeof field.choices[0]>
                {...attr}
                onChange={e => change(e.currentTarget.value)}
                defaultValue={field.value || field.initial}
                choices={field.choices}
                get_label={c => c[1]}
                get_value={c => c[0]}
            />
        )
    }

    // if ('validation' in field && field.validation === 'slug') {
    //     // some stuff
    // }

    return (
        <input
            {...attr}
            type='text'
            defaultValue={field.value || field.initial}
            maxLength={field.max_length}
            onChange={e => change(e.target.value)}
        />
    )
}

type TText = FC<FieldProps<TextFieldModel>>
const TextField: TText = ({ field, change, ...attr }) => {
    if (field.choices) {
        return (
            <ChoicesField<typeof field.choices[0]>
                {...attr}
                onChange={e => change(e.currentTarget.value)}
                defaultValue={field.value || field.initial}
                choices={field.choices}
                get_label={c => c[1]}
                get_value={c => c[0]}
            />
        )
    }

    return (
        <textarea
            {...attr}
            defaultValue={field.value || field.initial}
            onChange={e => change(e.target.value)}
            rows={10}
            cols={50}
        />
    )
}

type TJson = FC<FieldProps<JsonFieldModel>>
const JsonField: TJson = ({ field, change, ...attr }) => {
    if (field.choices) {
        return (
            <ChoicesField<typeof field.choices[0]>
                {...attr}
                onChange={e => change(e.currentTarget.value)}
                defaultValue={field.value || field.initial}
                choices={field.choices}
                get_label={c => c[1]}
                get_value={c => c[0]}
            />
        )
    }

    return (
        <textarea
            {...attr}
            defaultValue={field.value || field.initial}
            onChange={e => change(e.target.value)}
            rows={10}
            cols={50}
        />
    )
}

type TMarkDown = FC<FieldProps<MarkDownFieldModel>>
const MarkDownField: TMarkDown = ({ field, change, ...attr }) => {
    let default_content = undefined

    try {
        default_content = JSON.parse(JSON.parse(field.value || ''))
    } catch {}

    return (
        <div {...attr}>
            <Editor
                editorClassName='mk-editor'
                toolbarClassName='mk-toolbar'
                wrapperClassName='mk-wrapper'
                onContentStateChange={s => change(JSON.stringify(s))}
                contentState={default_content}
            />
        </div>
    )
}

export { CharField, TextField, JsonField, MarkDownField }
