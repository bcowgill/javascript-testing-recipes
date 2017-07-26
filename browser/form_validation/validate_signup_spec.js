with (JS.Test) {
	describe("validateSignup() [-validate_signup_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.signup = {
				email:    "validname@example.com",
				password: "a-nice-long-safe-password"
			}
		}})

		it("returns no errors for valid data [-validate_signup_spec:1-]", function () { with (this) {
			assertEqual( {}, validateSignup(signup) )
		}})

		it("returns an error for an invalid email [-validate_signup_spec:2-]", function () { with (this) {
			signup.email = "not-valid"
			assertEqual( {email: "Email address is not valid"}, validateSignup(signup) )
		}})

		it("returns an error for an short password [-validate_signup_spec:3-]", function () { with (this) {
			signup.password = "hi"
			assertEqual( {password: "Password is too short"}, validateSignup(signup) )
		}})
	}})
}
