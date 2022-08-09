import { AxiosRequestConfig } from 'axios'

import { PK, ProgressModel, REQUEST, SubmitOptions } from 'state'

interface ErrorResponse {
    ok: false
    fields: { [k: string]: string }
    message: string
    code: number
}

type Response = { ok: true; pk: PK } | ErrorResponse
type Progress = (p: ProgressModel | null) => void
type TSubmit = (props: SubmitOptions, progress?: Progress) => Promise<Response>

const Submit: TSubmit = async (props, progress) => {
    let url = `/api/${props.app_label}/${props.model_name}/brace-form-submit/`
    if (props.type === 'add') url += 'add/'
    else url += `change/`

    const config: AxiosRequestConfig = {
        url,
        method: 'POST',
        data: props.data,
    }

    if (progress) {
        config.onUploadProgress = (e: ProgressEvent) => {
            if (e.lengthComputable) {
                progress({
                    done: e.total === e.loaded,
                    percentage: (100 / e.total) * e.loaded,
                    loaded: e.loaded,
                    total: e.total,
                })
            } else {
                progress(null)
            }
        }
    }

    // onUploadProgress: (e: ProgressEvent) => {
    //     if (!e.lengthComputable) return progress

    //     console.log(e.total)
    //     console.log(e.loaded)

    //     console.log(useSetAtom(SubmitProgress))
    // },

    const response = await REQUEST(config)

    if (response.ok) return { ok: true, pk: response.data.pk }
    else return { fields: {}, ...response }

    // else alert(response.message)
}

export { Submit as SubmitBraceForm }
