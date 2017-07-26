// this jstest specific method makes async tests look just like syncronous tests
// but all test logic has to be in the server_steps object so you may have to
// write a variety of checkBody() type functions to do actual test assertions
var JS = require("jstest"),
	steps = require("./server_steps")

steps = JS.Test.asyncSteps(steps)

with (JS.Test) {
	describe("Storage server (async steps) [-async_steps_spec:0-]", function () { with (this) { addSkip(this)
		include(steps)

		before(function () { with (this) {
			startServer(4180)
		}})

		after(function () { with (this) {
			clearData()
			stopServer()
		}})

		it("saves and retrieves a value [-async_steps_spec:1-]", function () { with (this) {
			put("/meaning_of_life", {value: "42"})
			get("/meaning_of_life")
			checkBody("42\n")
		}})

		it("deletes all the data [-async_steps_spec:2-]", function () { with (this) {
			put("/meaning_of_life", {value: "42"})
			clearData()
			get("/meaning_of_life")
			checkBody("Not found\n")
		}})
	}})
}
