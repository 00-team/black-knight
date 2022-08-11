import { AxiosRequestConfig } from 'axios'

import {
    ErrorResponse,
    PK,
    ProgressModel,
    REQUEST,
    SubmitOptions,
    SuccessResponse,
} from 'state'

interface SRes extends SuccessResponse {
    pk: PK
}

interface ERes extends ErrorResponse {
    fields?: { [k: string]: string }
}

type Res = SRes | ERes

type Progress = (p: ProgressModel | null) => void
type TSubmit = (props: SubmitOptions, progress?: Progress) => Promise<Res>

const Submit: TSubmit = async (props, progress) => {
    let url = `/api/${props.app_label}/${props.model_name}/brace-form-submit/`
    if (props.type === 'add') url += 'add/'
    else if (props.type === 'delete') url += 'delete/'
    else if (props.type === 'change') url += 'change/'

    const config: AxiosRequestConfig = {
        url,
        method: 'POST',
        data: props.data,
        params: {
            pk: props.pk,
        },
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

    const response = await REQUEST(config)

    if (response.ok) {
        return { ok: true, pk: response.data.pk }
    } else {
        return response
    }
}

export { Submit as SubmitBraceForm }
