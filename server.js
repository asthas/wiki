const Server = require('hapi').Server
const H2o2   = require('h2o2')
const enableCors = require('./cors')

const server = new Server()

server.connection({
  port: '1338'
})

const route = {
  method: 'GET',
  path: '/{p*}',
  handler: {
    proxy: {
      host: 'en.wikipedia.org',
      port: '443',
      protocol: 'https'
    }
  }
}

server.register(H2o2)
  .then(() => {
    server.ext('onPreResponse', enableCors)
    server.route(route)
    return server.start()
  })
  .then(console.log(`Server running on ${server.info.uri}`))
  .catch(err => console.log('Error', err))
