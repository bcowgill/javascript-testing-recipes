var crypto = require("crypto"),
    _      = require("underscore")

var AdjustableUser = function(attributes) {
  var attrs = this._attributes = _.clone(attributes || {})

  attrs.keyLength  = attrs.keyLength  || AdjustableUser.KEY_LENGTH
  attrs.workFactor = attrs.workFactor || AdjustableUser.WORK_FACTOR
}

AdjustableUser.KEY_LENGTH  = 32
AdjustableUser.WORK_FACTOR = 200000*4.5

AdjustableUser.prototype.setPassword = function(password) {
  var attrs = this._attributes

  attrs.salt = crypto.randomBytes(attrs.keyLength).toString("hex")
  attrs.hash = this._hashPassword(password).toString("hex")
}

AdjustableUser.prototype.checkPassword = function(password) {
  var expected = new Buffer(this._attributes.hash || "", "hex"),
      actual   = this._hashPassword(password),
      n        = Math.max(actual.length, expected.length),
      diff     = 0

  for (var i = 0; i < n; i++) {
    diff |= actual[i] ^ expected[i]
  }
  return diff === 0
}

AdjustableUser.prototype._hashPassword = function(password) {
  var attrs = this._attributes,
      salt  = new Buffer(attrs.salt, "hex")

  return crypto.pbkdf2Sync(password, salt, attrs.workFactor, attrs.keyLength)
}

module.exports = AdjustableUser

