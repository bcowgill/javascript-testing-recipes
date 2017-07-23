var User = require("../passwords/adjustable_user"),
    util = require("util")

var ValidatedUser = function(attributes) {
  User.call(this, attributes)

  if (this._attributes.password) {
    this.setPassword(this._attributes.password)
    delete this._attributes.password
  }
}
util.inherits(ValidatedUser, User)

ValidatedUser.prototype.get = function(attribute) {
  return this._attributes[attribute]
}

ValidatedUser.prototype.set = function(attribute, value) {
  this._attributes[attribute] = value
}

ValidatedUser.prototype.validate = function() {
  var attrs  = this._attributes,
      errors = []

  if (attrs.username.length < 2) {
    errors.push("Usernames must have at least 2 characters")
  }
  if (!attrs.username.match(/^[a-z0-9_]+$/i)) {
    errors.push("Usernames may only contain letters, numbers and underscores")
  }
  if (!attrs.hash) {
    errors.push("Password must not be blank")
  }
  return errors.length > 0 ? errors : null
}

module.exports = ValidatedUser

