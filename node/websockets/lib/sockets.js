var WebSocket = require("faye-websocket"),
    crypto    = require("crypto")

var Sockets = function(service) {
  this._service = service
  this._rooms   = {}

  this._service.on("message", this.routeMessage.bind(this))
}

Sockets.prototype.acceptSocket = function(request, socket, body) {
  var ws   = new WebSocket(request, socket, body),
      id   = crypto.randomBytes(20).toString("hex"),
      room = null,
      self = this

  ws.onmessage = function(event) {
    if (room) delete self._rooms[room][id]
    room = event.data
    self._rooms[room] = self._rooms[room] || {}
    self._rooms[room][id] = ws
  }

  ws.onclose = function() {
    if (room) delete self._rooms[room][id]
    ws = null
  }
}

Sockets.prototype.routeMessage = function(message) {
  var room = this._rooms[message.room] || {}

  for (var id in room) {
    room[id].send(JSON.stringify(message.chat))
  }
}

module.exports = Sockets

