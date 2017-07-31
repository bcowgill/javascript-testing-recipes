var JS  = require("jstest"),
	app = require("./app")

with (JS.Test) {
	describe("Express app (mocking) [-app_mock_spec:0-]", function () { with (this) { addSkip(this)
		it("returns the query parameters as JSON [-app_mock_spec:1-]", function () { with (this) {
			var request = {
				method:  "GET",
				url:     "/?hello=world&something=else",
				headers: {}
			}

			var response = {_headers: {}}

			// framework noise...
			expect(response, "setHeader").given("Content-Length", "45")
			expect(response, "setHeader").given("Content-Type",   "text/html")
			expect(response, "setHeader").given("Content-Type",   "application/json") // maybe we care about this header also
			expect(response, "setHeader").given("ETag",           '"-917058233"')
			expect(response, "setHeader").given("X-Powered-By",   "Express")

			// what we actually care about testing
			expect(response, "end").given('{\n  "hello": "world",\n  "something": "else"\n}')

			app.emit("request", request, response)

			assertEqual( 200, response.statusCode )
		}})
	}})
}

