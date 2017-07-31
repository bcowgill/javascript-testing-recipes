var JS = require("jstest"),
	json = require("./json_matcher")

with (JS.Test) {
	describe("json() [-json_matcher_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.matcher = json({numbers: [1, 2, 3]})
		}})

		it("matches a JSON representation of the object [-json_matcher_spec:1-]", function () { with (this) {
			assertEqual( matcher, '{"numbers":[1,2,3]}' )
		}})

		it("matches a valid JSON representation with whitespace [-json_matcher_spec:2-]", function () { with (this) {
			assertEqual( matcher, '{\n  "numbers": [1, 2, 3]\n}' )
		}})

		it("does not match invalid JSON [-json_matcher_spec:3-]", function () { with (this) {
			assertNotEqual( matcher, '{"numbers":[1,2,3}' )
		}})

		it("does not match JSON that does not represent the data [-json_matcher_spec:4-]", function () { with (this) {
			assertNotEqual( matcher, '{"numbers":[1,9,3]}' )
		}})
	}})
}

