var events = require("events"),
	util   = require("util")

var Buzzer = function BuzzerClass () {
	events.EventEmitter.call(this)
}
util.inherits(Buzzer, events.EventEmitter)

Buzzer.prototype.press = function () {
	this.emit("buzz")
}

module.exports = Buzzer

