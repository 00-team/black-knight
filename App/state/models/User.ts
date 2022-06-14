interface UserModel {
    username: string
    avatar: string
    email: string
    first_name: string
    last_name: string
}

const DefaultUser: UserModel = {
    username: 'Anonymous',
    // default avatar (temporary)
    avatar: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
    email: '',
    first_name: '',
    last_name: '',
}

export { UserModel, DefaultUser }
