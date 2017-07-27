// Factory to create a utf8 stream transformer given a string →  string function
var stream = require("stream"),
	util   = require("util")

function makeStreamTransform (fn) {
	return function (chunk, encoding, callback) {
		chunk = fn(chunk.toString("utf8"))
		if (chunk !== null) {
			this.push(chunk)
		}
		callback()
	}
}

function transformFactory (fn) {
	var Transform = function CustomStreamTransform () {
		stream.Transform.call(this)
	}
	util.inherits(Transform, stream.Transform)
	Transform.prototype._transform = makeStreamTransform(fn)
	return Transform
}
transformFactory.makeStreamTransform = makeStreamTransform

module.exports = transformFactory

