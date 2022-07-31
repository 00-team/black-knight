import { SubmitOptions, REQUEST } from 'state'

const Submit = async (props: SubmitOptions) => {
    let url = `/api/${props.app_label}/${props.model_name}/brace-form-submit/`
    if (props.pk === undefined) url += 'add/'
    else url += `change/`

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
