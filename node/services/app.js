var express = require("express"),
    http    = require("http"),
    render  = require("./lib/render")
    renderValidation = require("./lib/renderValidation")

module.exports = function(validation, users, chats) {
  var app = express()
  app.use(express.urlencoded())

  // ajax -X POST http://localhost:7878/users -d username=alice
  app.post("/users", function(request, response) {
    var username = request.body.username

    var errors = validation.checkUser({username: username})
    if (errors) return renderValidation(response, errors)

    users.register(username, function(error, created, userData) {
      render(response, error, created ? 201 : 200, userData)
    })
  })

  // ajax -X POST http://localhost:7878/chat/garage -d userId=1 -d message="this is the message"
  app.post("/chat/:roomName", function(request, response) {
    var roomName  = request.params.roomName,
        userId    = request.body.userId,
        message   = request.body.message,
        timestamp = Date.now()

    var errors = validation.checkMessage({roomName: roomName, message: message})
    if (errors) return renderValidation(response, errors)

    chats.postMessage(roomName, userId, message, timestamp, function(error, messageData) {
      render(response, error, 201, messageData)
    })
  })

  // ajax -X GET http://localhost:7878/chat/garage?since=1000000000000
  app.get("/chat/:roomName", function(request, response) {
    var roomName = request.params.roomName,
        since    = parseInt(request.query.since || "0", 10),
        now      = Date.now()

    var errors = validation.checkPoll({roomName: roomName, since: since})
    if (errors) return renderValidation(response, errors)

    chats.pollMessages(roomName, since, now, function(error, messages) {
      render(response, error, 200, {messages: messages})
    })
  })

  return http.createServer(app)
}

