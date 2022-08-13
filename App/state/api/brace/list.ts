import { PK, REQUEST } from 'state'

interface SubmitActionsProps {
    items: 'all' | PK[]
    action: string
    model_name?: string
    app_label?: string
}

type SAT = (props: SubmitActionsProps) => Promise<void>
const SubmitAction: SAT = async ({ items, action, ...props }) => {
    if (!props.app_label || !props.model_name) return

    const response = await REQUEST({
        url: `/api/${props.app_label}/${props.model_name}/brace-actions/`,
        method: 'POST',
        data: {
            items,
            action,
        },
    })

    console.log(response)
}

export { SubmitAction }
