import { SubmitOptions, REQUEST, PK } from 'state'

interface Err {
    ok: false
    fields: { [k: string]: string }
    message: string
    code: number
}

type Response = { ok: true; pk: PK } | Err

const Submit = async (props: SubmitOptions): Promise<Response> => {
    let url = `/api/${props.app_label}/${props.model_name}/brace-form-submit/`
    if (props.type === 'add') url += 'add/'
    else url += `change/`

    const response = await REQUEST({
        url,
        method: 'POST',
        body: props.data,
    })

    if (response.ok) return { ok: true, pk: response.data.pk }
    else return { fields: {}, ...response }

    // else alert(response.message)
}

export { Submit as SubmitBraceForm }
