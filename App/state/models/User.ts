interface UserModel {
    username: string
    avatar: string
    email: string
    first_name: string
    last_name: string
}

const DefaultUser: UserModel = {
    username: 'Anonymous',
    avatar: '',
    email: '',
    first_name: '',
    last_name: '',
}

export { UserModel, DefaultUser }
