var ChatService = require("../../services/lib/chat_service"),
    events      = require("events"),
    util        = require("util"),
    _           = require("underscore")

var EventedChatService = function(connection) {
  ChatService.call(this, connection)
  events.EventEmitter.call(this)
}
util.inherits(EventedChatService, ChatService)
_.extend(EventedChatService.prototype, events.EventEmitter.prototype)

var postMessage = ChatService.prototype.postMessage

EventedChatService.prototype.postMessage = function(room, userId, message, now, callback) {
  var self = this

  postMessage.call(this, room, userId, message, now, function(error, messageData) {
    if (error) return callback(error)

    self.getMessage(messageData.id, function(error, message) {
      self.emit("message", {room: room, chat: message})
      callback(null, messageData)
    })
  })
}

module.exports = EventedChatService

