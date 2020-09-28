
const express = require('express')
const bodyParser = require('body-parser')
const { ApolloServer, gql }  = require('apollo-server-express')
const { createServer } = require('http')
const { execute, subscribe } = require('graphql')
const { makeExecutableSchema } = require('graphql-tools')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const morgan = require('morgan')
const pubsub = require('./pubsub')
const db = require('./db')
const typeDefs = require('./type-defs')
const resolvers = require('./resolvers')

const PORT = process.env.PORT || 3000
const HOSTNAME = process.env.HOSTNAME || 'localhost'

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))

  app.use('/graphiql', require('graphql-server-express').graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://${HOSTNAME}:${PORT}/subscriptions`,
  }))
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

async function context ({ req, connection }) {
  return { pubsub, db }
}

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req, connection }) => {
    return { db, pubsub }
  }
})

apolloServer.applyMiddleware({ app })

const server = createServer(app)

server.listen(PORT, () => {
    new SubscriptionServer({
      execute,
      subscribe,
      schema,
      onOperation: (message, params, webSocket) => {
        return { ...params, context: { db, pubsub }}
      }
    }, {
      server: server,
      path: '/subscriptions',
    })
})
