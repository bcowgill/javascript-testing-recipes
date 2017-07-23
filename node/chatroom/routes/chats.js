var validation = require("../../services/lib/validation")

var Chats = function(service) {
  this._service = service
}

Chats.prototype.get = function(request, response) {
  if (!request.user) return response.redirect("/signup")
  response.locals.port = Chats.PORT || 0
  response.render("chat")
}

Chats.prototype.post = function(request, response) {
  if (!request.user) {
    return response.json(401, {errors: ["You must be logged in"]})
  }

  var roomName = request.params.roomName,
      userId   = request.session.userId,
      message  = request.body.message,
      now      = Date.now()

  var errors = validation.checkMessage({roomName: roomName, message: message})
  if (errors) return response.json(409, {errors: errors})

  this._service.postMessage(roomName, userId, message, now, function(error, messageData) {
    render(response, error, 201, messageData)
  })
}

Chats.prototype.poll = function(request, response) {
  var roomName = request.params.roomName,
      since    = parseInt(request.query.since, 10),
      now      = Date.now()

  var errors = validation.checkPoll({roomName: roomName, since: since})
  if (errors) return response.json(409, {errors: errors})

  this._service.pollMessages(roomName, since, now, function(error, messages) {
    render(response, error, 200, {messages: messages})
  })
}

var render = function(response, error, status, data) {
  if (error) {
    response.json(500, {errors: [error.message]})
  } else {
    response.json(status, data)
  }
}

module.exports = Chats

