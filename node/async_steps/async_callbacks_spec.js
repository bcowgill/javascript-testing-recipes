// plain old async testing with pyramids of doom.
// see async_series.js for something a bit better
var JS = require("jstest"),
	steps = require("./server_steps")

with (JS.Test) {
	describe("Storage server (callbacks) [-async_callbacks_spec:0-]", function () { with (this) { addSkip(this)
		include(steps)

		before(function (resume) { with (this) {
			startServer(4180, resume)
		}})

		after(function (resume) { with (this) {
			clearData(function () {
				stopServer(resume)
			})
		}})

		it("saves and retrieves a value [-async_callbacks_spec:1-]", function (resume) { with (this) {
			put("/meaning_of_life", {value: "42"}, function () {
				get("/meaning_of_life", function () {
					resume(function (resume) {
						checkBody("42\n", resume)
					})
				})
			})
		}})

		it("deletes all the data [-async_callbacks_spec:2-]", function (resume) { with (this) {
			put("/meaning_of_life", {value: "42"}, function () {
				clearData(function () {
					get("/meaning_of_life", function () {
						resume(function (resume) {
							checkBody("Not found\n", resume)
						})
					})
				})
			})
		}})
	}})
}
