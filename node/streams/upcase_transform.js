var stream = require("stream"),
    util   = require("util")

var Upcase = function() {
  stream.Transform.call(this)
}
util.inherits(Upcase, stream.Transform)

Upcase.prototype._transform = function(chunk, encoding, callback) {
  chunk = chunk.toString("utf8").toUpperCase()
  this.push(chunk)
  callback()
}

module.exports = Upcase

