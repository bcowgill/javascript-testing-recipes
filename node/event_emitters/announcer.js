var events = require("events"),
	util   = require("util")

var Announcer = function (prelude) {
	this._prelude = prelude
	events.EventEmitter.call(this)
}
util.inherits(Announcer, events.EventEmitter)

Announcer.prototype.announce = function (message) {
	message = this._prelude + ", " + message
	this.emit("message", message)
}

module.exports = Announcer

