// src/resolvers/ts
import {
    getAllPastes,
    GetAllPastesInput,
    getOnePaste,
    GetOnePasteInput,
    createPaste,
    CreatePasteInput,
} from './controllers/paste.controller'
import {
    getAllUsers,
    GetAllUsersInput,
    getOneUser,
    GetOneUserInput,
    createUser,
    CreateUserInput,
} from './controllers/user.controller'
import { PASTE_CREATED, USER_CREATED } from './constants'
import { pubsub } from './app'

const resolvers = {
    Subscription: {
        PasteCreated: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: () => pubsub.asyncIterator([PASTE_CREATED]),
        },
        UserCreated: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: () => pubsub.asyncIterator([USER_CREATED]),
        },
    },
    Query: {
        pastes: (_: null, { input }: { input: GetAllPastesInput }) =>
            getAllPastes({ ...input }),
        getpaste: (_: null, { url }: { url: GetOnePasteInput }) => {
            return getOnePaste(url)
        },
    },
    Mutation: {
        CreatePaste: (_: null, { input }: { input: CreatePasteInput }) =>
            createPaste({ ...input }),
        CreateUser: (_: null, { input }: { input: CreateUserInput }) =>
            createUser({ ...input }),
        // DeletePaste: () => {},
        // DeleteUser: () => {},
    },
    // User: {
    //     pastes(user: User) {
    //         return filter(pastes, { userId: user.id })
    //     },
    // },
    // Post: {
    //     user(paste) {
    //         return find(users, { id: paste.userId })
    //     },
    // },
}

export default resolvers
