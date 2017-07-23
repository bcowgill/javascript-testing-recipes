var crypto = require("crypto"),
    _      = require("underscore")

var User = function(attributes) {
  this._attributes = _.clone(attributes || {})
}

User.KEY_LENGTH  = 32
User.WORK_FACTOR = 200000

User.prototype.setPassword = function(password) {
  var attrs = this._attributes

  attrs.salt = crypto.randomBytes(User.KEY_LENGTH).toString("hex")
  attrs.hash = this._hashPassword(password).toString("hex")
}

User.prototype.checkPassword = function(password) {
  var expected = new Buffer(this._attributes.hash || "", "hex"),
      actual   = this._hashPassword(password),
      n        = Math.max(actual.length, expected.length),
      diff     = 0

  for (var i = 0; i < n; i++) {
    diff |= actual[i] ^ expected[i]
  }
  return diff === 0
}

User.prototype._hashPassword = function(password) {
  var salt = new Buffer(this._attributes.salt || "", "hex")
  return crypto.pbkdf2Sync(password, salt, User.WORK_FACTOR, User.KEY_LENGTH)
}

module.exports = User

