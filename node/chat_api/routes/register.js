var async = require("async")

module.exports = function(request, response, redis) {
  var username = request.body.username || ""

  if (!username.match(/^[a-z0-9_]+$/i)) {
    return response.json(409, {
      errors: ["Usernames may only contain letters, numbers and underscores"]
    })
  }

  var userData = {username: username}

  async.waterfall([
    function(cb) {
      redis.sadd("users", username, cb)
    }, function(added, cb) {
      if (added === 1) {
        async.waterfall([
          function(cb) {
            redis.incr("counters:user", cb)
          }, function(id, cb) {
            userData.id = id
            redis.hmset("users:" + id, userData, cb)
          }, function(ok, cb) {
            redis.set("index:users:" + username, userData.id, cb)
          }, function(ok, cb) {
            cb(null, 201, userData)
          }
        ], cb)
      } else {
        async.waterfall([
          function(cb) {
            redis.get("index:users:" + username, cb)
          }, function(id, cb) {
            redis.hgetall("users:" + id, cb)
          }, function(userData, cb) {
            userData.id = parseInt(userData.id, 10)
            cb(null, 200, userData)
          }
        ], cb)
      }
    }
  ], function(error, status, data) {
    if (error) {
      response.json(500, {errors: [error.message]})
    } else {
      response.json(status, data)
    }
  })
}

