const { RedisPubSub } = require('graphql-redis-subscriptions')
const Redis = require('ioredis')

const redisOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379
}
const pubsub = new RedisPubSub({
  publisher: new Redis(redisOptions),
  subscriber: new Redis(redisOptions)
})

module.exports = pubsub
