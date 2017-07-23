var express = require("express"),
    http    = require("http"),
    redis   = require("redis")

var register    = require("./routes/register"),
    postMessage = require("./routes/post_message"),
    getMessages = require("./routes/get_messages")

module.exports = function(config) {
  var db = redis.createClient(config.redis.port, config.redis.host, config.redis)
  db.select(config.redis.database || 0)

  var app = express()
  app.use(express.urlencoded())

  app.post("/users", function(request, response) {
    register(request, response, db)
  })

  app.post("/chat/:roomName", function(request, response) {
    postMessage(request, response, db)
  })

  app.get("/chat/:roomName", function(request, response) {
    getMessages(request, response, db)
  })

  return http.createServer(app)
}

