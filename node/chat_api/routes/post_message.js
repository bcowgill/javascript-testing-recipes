var async = require("async"),
    time  = require("../lib/time")

module.exports = function(request, response, redis) {
  var roomName  = request.params.roomName || "",
      userId    = request.body.userId     || "",
      message   = request.body.message    || "",
      timestamp = time.current(),
      errors    = [],
      messageData

  if (!roomName.match(/^[a-z0-9_]+$/i)) {
    errors.push("Rooms may only contain letters, numbers and underscores")
  }
  if (message.match(/^ *$/)) {
    errors.push("Message must not be blank")
  }
  if (errors.length > 0) return response.json(409, {errors: errors})

  var saveState = []

  async.waterfall([
    function(cb) {
      redis.exists("users:" + userId, cb)
    }, function(exists, cb) {
      saveState.push("users:" + userId)
      var error = (exists === 0) ? "User #" + userId + " does not exist" : null
      cb(error && {message: error, status: 409})
    }, function(cb) {
      redis.incr("counters:message", cb)
    }, function(id, cb) {
      saveState.push("counters:message")
      messageData = {id: id, timestamp: timestamp, userId: userId, message: message}
      redis.hmset("messages:" + id, messageData, cb)
    }, function(ok, cb) {
      saveState.push("messages:" + messageData.id)
      redis.zadd("rooms:" + roomName + ":messages", timestamp, messageData.id, cb)
    }
  ], function(error) {
    if (error) {
      var state = saveState.join(", ")
      response.json(error.status || 500, {errors: [error.message + " <" + state + ">"]})
    } else {
      delete messageData.userId
      response.json(201, messageData)
    }
  })
}

