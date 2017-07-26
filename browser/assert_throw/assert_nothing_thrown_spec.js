with (JS.Test) {
	describe("assertNothingThrown [-assert_nothing_thrown_spec:0-]", function () { with (this) { addSkip(this)
		it("makes sure an error is not thrown [-assert_nothing_thrown_spec:1-]", function () { with (this) {
			assertNothingThrown(function () { "spline".toUpperCase() })
		}})
	}})
}

