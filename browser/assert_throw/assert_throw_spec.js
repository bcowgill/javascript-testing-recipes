with (JS.Test) {
	var memoize = function (call) {
		var memory
		return function () {
			return memory === void 0 ? (memory = call()) : memory
		}
	}

	// http://engineering.shapesecurity.com/2015/01/detecting-phantomjs-based-visitors.html
	var isPhantomJS = memoize(function () {
		var error
		var isPhantom = false
		// console.error("isPhantomJS");
		try {
			null[0]()
		}
		catch (exception) {
			// console.error("isPhantomJS catch ", exception, typeof exception.stack);
			error = exception
		}
		if (error.stack.indexOf('phantomjs') > -1) {
			isPhantom = 'phantom stack'
		}
		else if (window && (window.callPhantom || window._phantom)) {
			isPhantom = 'phantom globals'
		}
		else if (navigator && (!(navigator.plugins instanceof PluginArray) || navigator.plugins.length == 0)) {
			isPhantom = 'phantom plugins'
		}
		else if (!Function.prototype.bind) {
			isPhantom = 'phantom bind1'
		}
		else if (Function.prototype.bind.toString().replace(/bind/g, 'Error') != Error.toString()) {
			isPhantom = 'phantom bind2'
		}
		else if (Function.prototype.toString.toString().replace(/toString/g, 'Error') != Error.toString()) {
			isPhantom = 'phantom bind3'
		}
		// console.log("isPhantomJS ", isPhantom)
		return !!isPhantom
	})

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

	describe("assertThrow", function () { with (this) { addSkip(this)
		it("makes sure an error is thrown", function () { with (this) {
			assertThrow(TypeError, throwMe)
			//assertThrow("TypeError: undefined is not a function (evaluating '"spline".reticulate()')", function () { "spline".reticulate() })
		}})
		it("examines the error message thrown", function () { with (this) {
			var chromeErrorMessage = 'TypeError: "spline".reticulate is not a function'
			var phantomErrorMessage = "TypeError: undefined is not a function (evaluating '\"spline\".reticulate()')"
			var expect = isPhantomJS() ? phantomErrorMessage : chromeErrorMessage;
			assertSame(wrap(throwMe), expect)
		}})
		it("in case function does not throw", function () { with (this) {
			assertSame(wrap(function () {}), "nothing thrown")
		}})
	}})
}
