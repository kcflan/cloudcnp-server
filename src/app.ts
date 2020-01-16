// src/app.ts
import { ApolloServer, PubSub } from 'apollo-server'
import typeDefs from './schema'
import connect from './database/connect'
import resolvers from './resolvers'

export const pubsub = new PubSub()

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers })

// Move this into a configuration file
const DATABASE_NAME = 'test-database'

// The `listen` method launches a web server.
server.listen().then(async ({ url }: { url: string }) => {
    console.log(`🚀  Server ready at ${url}`)
    // Connect to your database
    await connect({ db: `mongodb://localhost:27017/${DATABASE_NAME}` })
})
