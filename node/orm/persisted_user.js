var store         = require("./store"),
    ValidatedUser = require("./validated_user"),
    util          = require("util"),
    async         = require("async")

PersistedUser = function(attributes, id) {
  ValidatedUser.call(this, attributes)
  this.id = id
}
util.inherits(PersistedUser, ValidatedUser)

PersistedUser.prototype.save = function(callback) {
  var errors = this.validate()
  if (errors) return callback(errors)

  var conn  = store.getConnection(),
      attrs = this._attributes,
      self  = this

  if (this.id) return conn.hmset("users:" + this.id, this._attributes, callback)

  async.waterfall([
    function(cb) {
      conn.sadd("users", attrs.username, cb)
    }, function(added, cb) {
      var error = (added === 0) ? ["Username already exists"] : null
      cb(error)
    }, function(cb) {
      conn.incr("counters:user", cb)
    }, function(id, cb) {
      self.id = id
      conn.set("index:users:" + attrs.username, id, cb)
    }, function(ok, cb) {
      conn.hmset("users:" + self.id, attrs, cb)
    }
  ], callback)
}

PersistedUser.findById = function(id, callback) {
  store.getConnection().hgetall("users:" + id, function(error, attributes) {
    if (error) return callback(error)
    if (!attributes) return callback(new Error("User #" + id + " not found"))

    attributes.keyLength  = parseInt(attributes.keyLength, 10)
    attributes.workFactor = parseInt(attributes.workFactor, 10)
    callback(null, new PersistedUser(attributes, id))
  })
}

PersistedUser.findByUsername = function(username, callback) {
  var conn = store.getConnection(), self = this

  async.waterfall([
    function(cb) {
      conn.get("index:users:" + username, cb)
    }, function(id, cb) {
      self.findById(id, cb)
    }
  ], callback)
}

module.exports = PersistedUser

