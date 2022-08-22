interface AdminModel {
    apps: AppModel[]
    apps_permission: boolean
}

interface AppModel {
    name: string
    app_label: string
    models: AppModelModel[]
}

interface AppModelModel {
    name: string
    object_name: string
    plural_name: string
    icon: string | null
    perms: PermsModel
}

interface PermsModel {
    add: boolean
    change: boolean
    delete: boolean
    view: boolean
}

export { AdminModel, AppModel, AppModelModel, PermsModel }
export { DefaultAdmin }

const DefaultAdmin: AdminModel = {
    apps: [],
    apps_permission: true,
}
