import { atom } from 'jotai'
import { SubmitOptions } from 'state'

import { SubmitData } from './store'

// type DataArgs = [string, string | Blob]
type V = (string | Blob) | (string | Blob)[]
interface TArgs extends Omit<SubmitOptions, 'data'> {
    [k: `F_${string}`]: V
}

// Brace Form Submit Data
const BFSData = atom(
    get => get(SubmitData),
    (get, set, args: TArgs) => {
        const { app_label, model_name, type, pk, ...fields } = args
        let { data, ...old_submit } = get(SubmitData)

        const _ = (a: unknown, b: unknown) => a && b && a !== b

        if (
            !data ||
            _(app_label, old_submit.app_label) ||
            _(model_name, old_submit.model_name) ||
            _(pk, old_submit.pk) ||
            _(type, old_submit.type)
        ) {
            data = new FormData()
        }

        if (pk) data.set('pk', pk.toString())
        if (type === 'add') data.delete('pk')

        Object.entries(fields).forEach(([key, value]) => {
            if (!data) return
            if (Array.isArray(value)) {
                if (value.length < 1) return // empty list

                data.set(key, value[0])
                value.slice(1).forEach(v => data && data.append(key, v))
            } else {
                data.set(key, value)
            }
        })

        set(SubmitData, {
            data,
            app_label: app_label || old_submit.app_label,
            model_name: model_name || old_submit.model_name,
            pk: pk || old_submit.pk,
            type: type || old_submit.type,
        })
    }
)

export { BFSData }
