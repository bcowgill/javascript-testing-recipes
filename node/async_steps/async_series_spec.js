// a little better than plain async testing with pyramids of doom
// uses async module to show steps in simple series, but it is verbose
// see async_continuables.js for something better
var JS = require("jstest"),
	async = require("async"),
	steps = require("./server_steps")

with (JS.Test) {
	describe("Storage server (async.series) [-async_series_spec:0-]", function () { with (this) { addSkip(this)
		include(steps)

		before(function (resume) { with (this) {
			async.series([
				function (cb) { startServer(4180, cb) }
			], resume)
		}})

		after(function (resume) { with (this) {
			async.series([
				function (cb) { clearData(cb) },
				function (cb) { stopServer(cb) }
			], resume)
		}})

		it("saves and retrieves a value [-async_series_spec:1-]", function (resume) { with (this) {
			async.series([
				function (cb) { put("/meaning_of_life", {value: "42"}, cb) },
				function (cb) { get("/meaning_of_life", cb) },
				function (cb) { checkBody("42\n", cb) }
			], resume)
		}})

		it("deletes all the data [-async_series_spec:2-]", function (resume) { with (this) {
			async.series([
				function (cb) { put("/meaning_of_life", {value: "42"}, cb) },
				function (cb) { clearData(cb) },
				function (cb) { get("/meaning_of_life", cb) },
				function (cb) { checkBody("Not found\n", cb) }
			], resume)
		}})
	}})
}
