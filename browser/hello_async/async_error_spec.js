with (JS.Test) {
	describe("Counter with async assertion [-async_error_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.counter = new Counter()
		}})

		it("increments the count [-async_error_spec:1-]", function (resume) { with (this) {
			counter.inc(5, function () {
				assertEqual( 5, counter.count )
				// throw new Error('assert wwwhhaaaaaat?')
				// DO NOT DO THIS, if an error is thrown (in counter.inc, or counter.inc after async, or here)
				// you may not get a good stack trace error report.
				// instead you should pass the asserts into the resume call as a function as shown in counter_spec.js
				resume()
			})
		}})
	}})
}
