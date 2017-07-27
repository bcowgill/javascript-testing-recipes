var stream = require("stream"),
    util   = require("util"),
    makeStreamTransform = require("../streams/transformer").makeStreamTransform

var filter = function (s) {
  //console.log('filter', s, this._query)
  if (s.indexOf(this._query) < 0) {
    s = null
  }
  return s
}

var Filter = function (query) {
  stream.Transform.call(this)
  this._query = query
  this._transform = makeStreamTransform(filter.bind(this))
}
util.inherits(Filter, stream.Transform)

module.exports = Filter

