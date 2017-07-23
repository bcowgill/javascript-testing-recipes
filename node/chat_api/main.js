var app = require("./app"),
    env = process.env

var server = app({
  redis: {
    host:     env.REDIS_HOST,
    port:     env.REDIS_PORT,
    database: env.REDIS_DB
  }
})

server.listen(env.SERVER_PORT)

