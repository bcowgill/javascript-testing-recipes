var stream = require("stream"),
	util   = require("util"),
	transformFactory = require("./transformer")

/*
var Upcase = function() {
	stream.Transform.call(this)
}
util.inherits(Upcase, stream.Transform)

Upcase.prototype._transform = makeStreamTransform(function (s) { return s.toUpperCase() })
*/

module.exports = transformFactory(function (s) { return s.toUpperCase() }, 'UpcaseStreamTransform')

