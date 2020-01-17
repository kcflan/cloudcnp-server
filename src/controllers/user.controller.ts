// src/controllers/user.controller.ts
import UserModel, { User } from '../models/user.model'
import { USER_CREATED } from '../constants'
import { pubsub } from '../app'

export interface CreateUserInput {
    name: string
    email: string
    password: string
    pastes: []
}

// Create a new user from the given input
export async function createUser({
    name,
    email,
    password,
    pastes,
}: CreateUserInput): Promise<User | Error> {
    const user = await UserModel.create({
        name,
        email,
        password,
        pastes,
    })
        .then((data: User) => data)
        .catch((error: Error) => {
            throw error
        })

    // Publish the creation of a new user to whomever is listening
    pubsub.publish(USER_CREATED, { UserCreated: user })

    return user
}

export interface GetAllUsersInput {
    limit?: number
}

export function getAllUsers({ limit }: GetAllUsersInput) {
    return UserModel.find({})
        .limit(limit ? limit : 0)
        .then((data: User[]) => data)
        .catch((error: Error) => {
            throw error
        })
}
export interface GetOneUserInput {
    name?: string
}

export function getOneUser({ name }: GetOneUserInput) {
    return (
        UserModel.find({})
            // .limit(url ? url : '')
            .then((data: User[]) => data)
            .catch((error: Error) => {
                throw error
            })
    )
}
