with (JS.Test) {
	function throwMe () { "spline".reticulate() }

	function wrap (fnThrow) {
		var thrown = 'nothing thrown'
		try {
			fnThrow()
		}
		catch (exception) {
			thrown = exception.toString()
		}
		return thrown
	}

	describe("assertThrow", function () { with (this) {
		it("makes sure an error is thrown", function () { with (this) {
			assertThrow(TypeError, throwMe)
			//assertThrow("TypeError: undefined is not a function (evaluating '"spline".reticulate()')", function () { "spline".reticulate() })
		}})
		it("examines the error message thrown", function () { with (this) {
			assertSame(wrap(throwMe), "TypeError: undefined is not a function (evaluating '\"spline\".reticulate()')")
		}})
		it("in case function does not throw", function () { with (this) {
			assertSame(wrap(function () {}), "nothing thrown")
		}})
	}})
}

