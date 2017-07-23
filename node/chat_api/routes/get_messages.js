var async = require("async"),
    time  = require("../lib/time")

module.exports = function(request, response, redis) {
  var roomName = request.params.roomName,
      since    = request.query.since || "",
      now      = time.current(),
      errors   = []

  if (!roomName.match(/^[a-z0-9_]+$/i)) {
    errors.push("Rooms may only contain letters, numbers and underscores")
  }
  if (!since.match(/^[1-9][0-9]{12}$/)) {
    errors.push("The 'since' parameter must be a valid timestamp")
  }
  if (errors.length > 0) return response.json(409, {errors: errors})

  since = parseInt(since, 10)

  async.waterfall([
    function(cb) {
      redis.zrangebyscore("rooms:" + roomName + ":messages", since, now, cb)
    }, function(messageIds, cb) {
      async.map(messageIds, function(id, cb) {
        var messageData
        async.waterfall([
          function(cb) {
            redis.hgetall("messages:" + id, cb)
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
        ], cb)
      }, cb)
    }
  ], function(error, messages) {
    if (error) {
      response.json(500, {error: error.message})
    } else {
      response.json(200, {messages: messages})
    }
  })
}

