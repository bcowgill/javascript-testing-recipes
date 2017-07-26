with (JS.Test) {
	describe("validateForm()", function () { with (this) { addSkip(this)
		extend(HtmlFixture)

		fixture(' \
			<form method="post" action="/" class="test-form"> \
				<p> \
					<label for="email">Email</label> \
					<input type="text" name="email" id="email"> \
				</p> \
				<p> \
					<label for="password">Password</label> \
					<input type="password" name="password" id="password"> \
				</p> \
				<input type="submit" value="Sign up"> \
			</form> ')

		before(function () { with (this) {
			validateForm(fixture.find(".test-form"))
		}})

		it("fails if the email address is invalid", function (resume) { with (this) {
			fixture.find("[name=email]").val("not-an-email")
			fixture.find("[name=password]").val("valid-password")

			Syn.click(fixture.find("[type=submit]"), function () {
				resume(function () {
					assertEqual( "Email address is not valid", fixture.find(".error").text() )
				})
			})
		}})

		it("fails if the password is too short", function (resume) { with (this) {
			fixture.find("[name=email]").val("email@example.com")
			fixture.find("[name=password]").val("no")

			Syn.click(fixture.find("[type=submit]"), function () {
				resume(function () {
					assertEqual( "Password is too short", fixture.find(".error").text() )
				})
			})
		}})
	}})
}
