interface MainhallListModel {
    instances: string[][]
    instance_labels: string[]
}

export { MainhallListModel }

const DefaultMainhallList: MainhallListModel = {
    instances: [],
    instance_labels: [],
}

export { DefaultMainhallList }
