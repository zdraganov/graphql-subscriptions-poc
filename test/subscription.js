
const { execute } = require('apollo-link')
const { WebSocketLink } = require('apollo-link-ws')
const { SubscriptionClient } = require('subscriptions-transport-ws')
const ws = require('ws')

const getWsClient = function(wsurl) {
  const client = new SubscriptionClient(
    wsurl, {reconnect: true}, ws
  )
  return client
}

const createSubscriptionObservable = (wsurl, query, variables) => {
  const link = new WebSocketLink(getWsClient(wsurl))
  return execute(link, {query: query, variables: variables})
}

const gql = require('graphql-tag')
const SUBSCRIBE_QUERY = gql`
subscription server {
  server {
    id
    name
  }
}
`

function main() {
  const subscriptionClient = createSubscriptionObservable(
    'ws://localhost:3000/subscriptions',
    SUBSCRIBE_QUERY
  )
  var consumer = subscriptionClient.subscribe(eventData => {
    // Do something on receipt of the event
    console.log("Received event: ")
    console.log(JSON.stringify(eventData, null, 2))
  }, (err) => {
    console.log('Err')
    console.log(err);
  })
}

main()
