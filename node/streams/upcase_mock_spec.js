var JS     = require("jstest"),
	Upcase = require("./upcase_transform")

with (JS.Test) {
	describe("Upcase [-upcase_mock_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.upcase = new Upcase()
		}})

		it("pushes an uppercase string [-upcase_mock_spec:1-]", function (resume) { with (this) {
			expect(upcase, "push").given("WHAT UP")
			upcase._transform(new Buffer("what up"), "utf8", resume)
		}})
	}})
}

