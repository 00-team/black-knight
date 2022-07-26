interface BaseField {
    name: string
}

interface CharField extends BaseField {
    type: 'char'
    max: number
}

interface IntField extends BaseField {
    type: 'int'
    min: number
}

interface OtherField extends BaseField {
    type: 'text' | 'image' | 'date'
}

type Field = CharField | IntField | OtherField
