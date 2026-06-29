export type User = {
    id: number,
    firstname: string,
    lastname: string,
    patronymic: string,
    email: string,
    password_hash: string,
    is_admin: boolean
}

export type GetUser = {
    id: number,
    firstname: string,
    lastname: string,
    patronymic: string,
    email: string,
    is_admin: boolean
}

export type CreateUser = {
    firstname: string,
    lastname: string,
    patronymic: string,
    email: string,
    password: string
}

export type UpdateUser = {
    new_password: string
}