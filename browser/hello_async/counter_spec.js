with (JS.Test) {
	describe("Counter [-counter_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.counter = new Counter()
		}})

		it("increments the count [-counter_spec:1-]", function (resume) { with (this) {
			counter.inc(5, function () {
				resume(function () {
					assertEqual( 5, counter.count )
				})
			})
		}})
	}})
}
