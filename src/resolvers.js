const { addErrorLoggingToSchema } = require('apollo-server')

module.exports = {
  Query: {
    getServer: (_, args, { db }) => {
      if (args.id) {
        return db.find(s => s.id === args.id)
      }
    },
    getServers: (_, args, { db }) => {
      if (args.query) {
        return db.filter(s => s.name.includes(args.query))
      }

      return servers
    }
  },
  Subscription: {
    server: {
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator('server'),
      resolve: (payload, args, context, info) => payload
    }
  }
}
