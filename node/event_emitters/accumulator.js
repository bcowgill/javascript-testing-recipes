var Accumulator = function (emitter) {
	this.sum = 0
	var self = this
	emitter.on("number", function (n) {
		self.sum += n
	})
}

module.exports = Accumulator

