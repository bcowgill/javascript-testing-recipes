var Notifier = function() {}
_.extend(Notifier.prototype, Backbone.Events)

Notifier.prototype.listen = function(path) {
  var socket = new WebSocket("ws://localhost" + path),
      self   = this

  socket.onmessage = function(event) {
    self.trigger("update", JSON.parse(event.data))
  }
}

