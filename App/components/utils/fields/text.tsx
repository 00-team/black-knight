import React, { FC } from 'react'

import {
    CharFieldModel,
    DurationFieldModel,
    GenericIPAddressFieldModel,
    JsonFieldModel,
    SlugFieldModel,
    TextFieldModel,
    UrlFieldModel,
} from 'state'

import { ChoicesField, FieldProps } from './shared'

type TChar = FC<FieldProps<CharFieldModel>>
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

type TUrl = FC<FieldProps<UrlFieldModel>>
const UrlField: TUrl = ({ field, change, ...attr }) => {
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
        <input
            {...attr}
            type='text'
            defaultValue={field.value || field.initial}
            maxLength={field.max_length}
            onChange={e => change(e.target.value)}
        />
    )
}

type TSlug = FC<FieldProps<SlugFieldModel>>
const SlugField: TSlug = ({ field, change, ...attr }) => {
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

type TDuration = FC<FieldProps<DurationFieldModel>>
const DurationField: TDuration = ({ field, change, ...attr }) => {
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
        <input
            {...attr}
            type='text'
            defaultValue={field.value || field.initial}
            onChange={e => change(e.target.value)}
        />
    )
}

// Type Generic IP Address
type TGIA = FC<FieldProps<GenericIPAddressFieldModel>>
const GenericIPAddressField: TGIA = ({ field, change, ...attr }) => {
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
        <input
            {...attr}
            type='text'
            defaultValue={field.value || field.initial}
            onChange={e => change(e.target.value)}
        />
    )
}

export {
    CharField,
    UrlField,
    TextField,
    JsonField,
    DurationField,
    GenericIPAddressField,
    SlugField,
}
