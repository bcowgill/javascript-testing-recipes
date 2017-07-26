with (JS.Test) {
	describe("Counter with async assertion", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.counter = new Counter()
		}})

		it("increments the count", function (resume) { with (this) {
			counter.inc(5, function () {
				assertEqual( 5, counter.count )
				resume()
			})
		}})
	}})
}
