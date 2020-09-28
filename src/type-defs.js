//type definitions and schemas - (operation and data structure)
const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        getServer(id: Int):Server
        getServers(query: String):[Server!]
    }

    type Server {
        id: ID!
        name:String!
    }

    type Subscription {
        server: Server
    }
`

module.exports = typeDefs
