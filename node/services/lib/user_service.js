var async = require("async")

var UserService = function(redis) {
  this._redis = redis
}

UserService.prototype.register = function(username, callback) {
  var userData = {username: username},
      redis    = this._redis,
      self     = this

  async.waterfall([
    function(cb) {
      redis.sadd("users", username, cb)
    }, function(added, cb) {
      if (added === 1) {
        self._create(userData, cb)
      } else {
        self._findByUsername(username, cb)
      }
    }
  ], callback)
}

UserService.prototype._create = function(userData, callback) {
  var redis = this._redis

  async.waterfall([
    function(cb) {
      redis.incr("counters:user", cb)
    }, function(id, cb) {
      userData.id = id
      redis.hmset("users:" + id, userData, cb)
    }, function(ok, cb) {
      redis.set("index:users:" + userData.username, userData.id, cb)
    }, function(ok, cb) {
      cb(null, true, userData)
    }
  ], callback)
}

UserService.prototype._findByUsername = function(username, callback) {
  var redis = this._redis

  async.waterfall([
    function(cb) {
      redis.get("index:users:" + username, cb)
    }, function(id, cb) {
      redis.hgetall("users:" + id, cb)
    }, function(userData, cb) {
      userData.id = parseInt(userData.id, 10)
      cb(null, false, userData)
    }
  ], callback)
}

module.exports = UserService

