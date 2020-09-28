const pubsub = require('./pubsub')
const servers = require('./db')

var myArgs = process.argv.slice(2)

const server = {
  id: myArgs[0],
  name: myArgs[1]
}

pubsub.publish('server', server)
  .then(() => {
    console.log('added: ', server)
    process.exit(0)
  })
  .catch((err) => {
    console.error(err);
    process.exit(1)
  })
