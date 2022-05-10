interface PermsModel {
    add: boolean
    change: boolean
    delete: boolean
    view: boolean
}

interface AppModelModel {
    name: string
    object_name: string
    icon: string
    perms: PermsModel
}

interface AppModel {
    name: string
    app_label: string
    models: AppModelModel[]
}

interface AdminModel {
    apps: AppModel[]
}

export { AdminModel, AppModel, AppModelModel, PermsModel }

const DefaultAdmin: AdminModel = {
    apps: [],
}

export { DefaultAdmin }
