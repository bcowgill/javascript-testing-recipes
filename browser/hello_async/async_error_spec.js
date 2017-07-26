with (JS.Test) {
	describe("Counter with async assertion [-async_error_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.counter = new Counter()
		}})

		it("increments the count [-async_error_spec:1-]", function (resume) { with (this) {
			counter.inc(5, function () {
				assertEqual( 5, counter.count )
				resume()
			})
		}})
	}})
}
