with (JS.Test) {
	describe("debug() with mocks [-debug_mock_spec:0-]", function () { with (this) { addSkip(this)
		it("writes the message to the console with a timestamp [-debug_mock_spec:1-]", function () { with (this) {
			expect(console, "info").given(match(/^[0-9]{13} hello$/))
			debug("hello")
		}})
	}})
}

