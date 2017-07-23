var stream = require("stream"),
    util   = require("util")

var Source = function(chunks, interval) {
  stream.Readable.call(this)

  this._chunks   = chunks
  this._index    = 0
  this._interval = interval
}
util.inherits(Source, stream.Readable)

Source.prototype._read = function() {
  var self = this
  setTimeout(function() {
    if (self._index === self._chunks.length) {
      self.push(null)
    } else {
      self.push(self._chunks[self._index])
      self._index += 1
    }
  }, this._interval)
}

module.exports = Source

