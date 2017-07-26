// This method using async and a curry helper can be used with any test runner framework which
// supports a resume function being passed into the before/after/it blocks
// jstest itself has built in support and can make things even simpler. see async_steps_spec.js
var JS = require("jstest"),
	async = require("async"),
	steps = require("./server_steps"),
	curry = require("./curry")

steps = curry.object(steps)

with (JS.Test) {
	describe("Storage server (continuables) [-async_continuables_spec:0-]", function () { with (this) { addSkip(this)
		include(steps)

		before(function (resume) { with (this) {
			async.series([
				startServer(4180)
			], resume)
		}})

		after(function (resume) { with (this) {
			async.series([
				clearData(),
				stopServer()
			], resume)
		}})

		it("saves and retrieves a value [-async_continuables_spec:1-]", function (resume) { with (this) {
			async.series([
				put("/meaning_of_life", {value: "42"}),
				get("/meaning_of_life"),
				checkBody("42\n")
			], resume)
		}})

		it("deletes all the data [-async_continuables_spec:2-]", function (resume) { with (this) {
			async.series([
				put("/meaning_of_life", {value: "42"}),
				clearData(),
				get("/meaning_of_life"),
				checkBody("Not found\n")
			], resume)
		}})
	}})
}
