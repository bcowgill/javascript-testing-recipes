var JS     = require("jstest"),
	concat = require("concat-stream"),
	Source = require("./source")

with (JS.Test) {
	describe("Source.pipe() [-pipe_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.stream = new Source(["a", "b", "c"], 10)
			stream.setEncoding("utf8")
		}})

		it("emits all the output [-pipe_spec:1-]", function (resume) { with (this) {
			stream.pipe(concat(function (output) {
				resume(function () {
					assertEqual( "abc", output )
				})
			}))
		}})
	}})
}

