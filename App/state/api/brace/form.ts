import { TBFSOptions, REQUEST } from 'state'

const Submit = async (props: TBFSOptions) => {
    let url = `/api/${props.app_label}/${props.model_name}/brace-form-submit/`
    if (props.type === 'add') url += 'add/'
    else url += `change/?pk=${props.pk}`

    const response = await REQUEST({
        url,
        method: 'POST',
        body: props.data,
    })
    console.log(response)
    // if (response.ok) location.assign('/')
    // else alert(response.message)
}

export { Submit as SubmitBraceForm }
