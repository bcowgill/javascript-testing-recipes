var crypto = require("crypto"),
    _      = require("underscore")

var User = function(attributes) {
  this._attributes = _.clone(attributes || {})
}

// big values to slow down password checking so brute force attacks
// will not be effective should set WORK_FACTOR so that hashing a
// password takes half a second on your server hardware
// perhaps a better way is to calculate the password hash async
// and ensure it doesn't return a value before 500ms have elapsed
User.KEY_LENGTH  = 32
User.WORK_FACTOR = 200000*4.5

User.prototype.setPassword = function(password) {
  var attrs = this._attributes

  attrs.salt = crypto.randomBytes(User.KEY_LENGTH).toString("hex")
  attrs.hash = this._hashPassword(password).toString("hex")
}

// constant time password comparison to prevent cracking attempts
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

