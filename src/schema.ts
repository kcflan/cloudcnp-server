// src/schema.ts
import { gql } from 'apollo-server'

const typeDefs = gql`
    # New subscriptions type
    type Subscription {
        PasteCreated: Paste
        UserCreated: User
    }
    type Paste {
        _id: ID!
        url: String!
        pastedBy: String
        # pastedBy: User
        content: String
        duration_period: String
    }
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
        pastes: [Paste]
    }
    type Query {
        pastes: [Paste]
        # Retrive a user by its id.
        #user(id: Int!): User
        getpaste(url: String!): [Paste]
        # Retrive a paste by its id.
        #getpasteid(_id: ID!): [Paste]
        #getpaste(url: String!): [Paste]
    }
    type AuthPayload {
        token: String
        user: User
    }
    input CreatePasteInput {
        url: String
        pastedBy: String
        content: String
        duration_period: String
    }
    input CreateUserInput {
        name: String
        email: String
        password: String
        #pastes: [String]
    }
    type Mutation {
        CreatePaste(input: CreatePasteInput): Paste
        CreateUser(input: CreateUserInput): User
        #CreateUser(input: CreateUserInput): AuthPayload
        UserLogin(email: String!, password: String!): AuthPayload
    }
`

export default typeDefs

// type Query {
//     pastes: [Paste]
// }

// type Mutation {
//     CreateUser(input: CreateUserInput): User
// }
