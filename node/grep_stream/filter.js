var stream = require("stream"),
    util   = require("util")

var Filter = function(query) {
  stream.Transform.call(this)
  this._query = query
}
util.inherits(Filter, stream.Transform)

Filter.prototype._transform = function(chunk, encoding, callback) {
  chunk = chunk.toString("utf8")
  if (chunk.indexOf(this._query) >= 0) {
    this.push(chunk)
  }
  callback()
}

module.exports = Filter

