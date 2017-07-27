var events = require("events"),
	util   = require("util")

var Counter = function () {
	events.EventEmitter.call(this)
	this._count = 0
}
util.inherits(Counter, events.EventEmitter)

Counter.prototype.count = function () {
	this._count += 1
	this.emit("number", this._count)
}

module.exports = Counter

