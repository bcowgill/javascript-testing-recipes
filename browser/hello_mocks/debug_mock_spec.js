with (JS.Test) {
	describe("debug() with mocks", function () { with (this) { addSkip(this)
		it("writes the message to the console with a timestamp", function () { with (this) {
			expect(console, "info").given(match(/^[0-9]{13} hello$/))
			debug("hello")
		}})
	}})
}

