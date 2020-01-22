// src/app.ts
import { ApolloServer, PubSub } from 'apollo-server'
import typeDefs from './schema'
import connect from './database/connect'
import resolvers from './resolvers'
const dotenv = require('dotenv').config()

// const Query = require('./resolvers/query')
// const Mutation = require('./resolvers/mutation')
// const User = require('./resolvers/user')
// const Link = require('./resolvers/link')
// const resolvers = {
//     Query,
//     Mutation,
//     User,
//     Link
//   }

export const pubsub = new PubSub()

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: ({ req, res }) => ({ req, res }),
})

const DATABASE_NAME = process.env.DATABASE_NAME
const uri = `mongodb://localhost:27017/${DATABASE_NAME}`

// The `listen` method launches a web server.
server.listen().then(async ({ url }: { url: string }) => {
    console.log(`🚀  Server ready at ${url}`)
    // Connect to your database
    await connect({ db: process.env.MONGODB_URI })
    // await connect({ db: `mongodb://localhost:27017/${DATABASE_NAME}` })
})
