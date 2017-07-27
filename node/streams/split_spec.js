var JS     = require("jstest"),
	Source = require("./source"),
	split  = require("split")

with (JS.Test) {
	describe("split() [-split_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.chunks = ["some chop", "ped up\nte", "xt to\n", "parse"]
		}})

		it("splits the input stream on line breaks [-split_spec:1-]", function (resume) { with (this) {
			var source = new Source(chunks, 10),
				data   = [],
				stream = source.pipe(split())

			stream.on("data", data.push.bind(data))

			stream.on("end", function () {
				resume(function () {
					assertEqual( ["some chopped up", "text to", "parse"], data )
				})
			})
		}})
	}})
}

