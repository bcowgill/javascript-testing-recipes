var JS    = require("jstest"),
	app   = require("./app"),
	steps = require("../basic_server/server_steps")

with (JS.Test) {
	describe("Express app [-app_spec:0-]", function () { with (this) { addSkip(this)
		include(steps)

		before(function () { with (this) {
			startServer(app)
		}})

		after(function () { with (this) {
			stopServer()
		}})

		it("returns the query parameters as JSON [-app_spec:1-]", function () { with (this) {
			get("/", {hello: "world", something: "else"})
			checkStatus(200)
			checkJSON({hello: "world", something: "else"})
		}})
	}})
}

