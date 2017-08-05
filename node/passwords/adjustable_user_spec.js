var JS   = require("jstest"),
	User = require("./adjustable_user")

with (JS.Test) {
	describe("AdjustableUser [-adjustable_user_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.user = new User({workFactor: 1})
			user.setPassword("secret")
		}})

		it("accepts the correct password [-adjustable_user_spec:1-]", function () { with (this) {
			assert( user.checkPassword("secret") )
		}})

		it("rejects incorrect passwords [-adjustable_user_spec:2-]", function () { with (this) {
			assertNot( user.checkPassword("secre") )
			assertNot( user.checkPassword("secrets") )
			assertNot( user.checkPassword("wrong") )
		}})

		it("rejects a password with the wrong case [-adjustable_user_spec:3-]", function () { with (this) {
			assertNot( user.checkPassword("SeCrEt") )
		}})
	}})
}

