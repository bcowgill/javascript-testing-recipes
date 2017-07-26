with (JS.Test) {
	describe("debug() with spies [-debug_spy_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			sinon.spy(console, "info")
		}})

		after(function () { with (this) {
			console.info.restore()
		}})

		it("writes the message to the console with a timestamp [-debug_spy_spec:1-]", function () { with (this) {
			debug("hello")
			sinon.assert.calledWithMatch(console.info, /^[0-9]{13} hello$/)
		}})
	}})
}

