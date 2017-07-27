var JS          = require("jstest"),
	Counter     = require("./counter"),
	Accumulator = require("./accumulator")

with (JS.Test) {
	describe("Counting [-counting_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.counter     = new Counter()
			this.accumulator = new Accumulator(counter)
		}})

		it("sums the natural numbers [-counting_spec:1-]", function () { with (this) {
			for (var i = 0; i < 5; i++) {
				counter.count()
			}
			assertEqual( 15, accumulator.sum )
		}})
	}})
}
