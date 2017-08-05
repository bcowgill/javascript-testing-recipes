var JS   = require("jstest"),
	User = require("./user")

with (JS.Test) {
	describe("User (slow) [-user_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.user = new User()
		}})

		describe("with no password [-user_spec:1-]", function () { with (this) { addSkip(this)
			it("rejects all passwords [-user_spec:2-]", function () { with (this) {
				["a", "list", "of", "password", "attempts"].forEach(function (pw) {
					assertNot( user.checkPassword(pw) )
				})
			}})
		}})

		describe("with a password [-user_spec:3-]", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				user.setPassword("secret")
			}})

			it("accepts the correct password [-user_spec:4-]", function () { with (this) {
				assert( user.checkPassword("secret") )
			}})

			it("rejects incorrect passwords [-user_spec:5-]", function () { with (this) {
				assertNot( user.checkPassword("secre") )
				assertNot( user.checkPassword("secrets") )
				assertNot( user.checkPassword("wrong") )
			}})

			it("rejects a password with the wrong case [-user_spec:6-]", function () { with (this) {
				assertNot( user.checkPassword("SeCrEt") )
			}})

			it("check password 20 times, should take about 10 seconds if WORK_FACTOR set correctly [-user_spec:7-]", function () { with (this) {
				for (var i = 10; i > 0; --i) {
					assert( user.checkPassword("secret") )
				}
			}})

		}})
	}})
}

