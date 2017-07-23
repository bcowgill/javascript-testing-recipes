var async = require("async")

var ChatService = function(redis) {
  this._redis = redis
}

ChatService.prototype.postMessage = function(room, userId, message, now, callback) {
  var redis = this._redis, messageData

  async.waterfall([
    function(cb) {
      redis.exists("users:" + userId, cb)
    }, function(exists, cb) {
      var error = (exists === 0) ? "User #" + userId + " does not exist" : null
      cb(error && new Error(error))
    }, function(cb) {
      redis.incr("counters:message", cb)
    }, function(id, cb) {
      messageData = {id: id, timestamp: now, userId: userId, message: message}
      redis.hmset("messages:" + id, messageData, cb)
    }, function(ok, cb) {
      redis.zadd("rooms:" + room + ":messages", now, messageData.id, cb)
    }, function(ok, cb) {
      delete messageData.userId
      cb(null, messageData)
    }
  ], callback)
}

ChatService.prototype.pollMessages = function(room, since, now, callback) {
  var self = this

  async.waterfall([
    function(cb) {
      self._redis.zrangebyscore("rooms:" + room + ":messages", since, now, cb)
    }, function(messageIds, cb) {
      async.map(messageIds, self.getMessage.bind(self), cb)
    }
  ], callback)
}

ChatService.prototype.getMessage = function(messageId, callback) {
  var redis = this._redis, messageData

  async.waterfall([
    function(cb) {
      redis.hgetall("messages:" + messageId, cb)
    }, function(data, cb) {
      messageData = data
      messageData.id = parseInt(messageData.id, 10)
      messageData.timestamp = parseInt(messageData.timestamp, 10)
      redis.hget("users:" + messageData.userId, "username", cb)
    }, function(username, cb) {
      messageData.username = username
      delete messageData.userId
      cb(null, messageData)
    }
  ], callback)
}

module.exports = ChatService

