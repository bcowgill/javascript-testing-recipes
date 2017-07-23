var express = require("express"),
    http    = require("http"),
    redis   = require("redis")
    render  = require("./lib/render")

module.exports = function(validation, users, chats) {
  var app = express()
  app.use(express.urlencoded())

  app.post("/users", function(request, response) {
    var username = request.body.username

    var errors = validation.checkUser({username: username})
    if (errors) return response.json(409, {errors: errors})

    users.register(username, function(error, created, userData) {
      render(response, error, created ? 201 : 200, userData)
    })
  })

  app.post("/chat/:roomName", function(request, response) {
    var roomName  = request.params.roomName,
        userId    = request.body.userId,
        message   = request.body.message,
        timestamp = Date.now()

    var errors = validation.checkMessage({roomName: roomName, message: message})
    if (errors) return response.json(409, {errors: errors})

    chats.postMessage(roomName, userId, message, timestamp, function(error, messageData) {
      render(response, error, 201, messageData)
    })
  })

  app.get("/chat/:roomName", function(request, response) {
    var roomName = request.params.roomName,
        since    = parseInt(request.query.since || "0", 10),
        now      = Date.now()

    var errors = validation.checkPoll({roomName: roomName, since: since})
    if (errors) return response.json(409, {errors: errors})

    chats.pollMessages(roomName, since, now, function(error, messages) {
      render(response, error, 200, {messages: messages})
    })
  })

  return http.createServer(app)
}

