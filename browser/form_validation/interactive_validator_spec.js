with (JS.Test) {
	describe("InteractiveValidator [-interactive_validator_spec:0-]", function () { with (this) { addSkip(this)
		extend(HtmlFixture)
		fixture(FORM_HTML)

		before(function () { with (this) {
			stub(this, "validator").returns({password: "Password is too short"})
			new InteractiveValidator(fixture.find("form"), validator)
		}})

		it("triggers validation using type() [-interactive_validator_spec:1-]", function (resume) { with (this) {
			Syn.type(fixture.find("[name=password]"), "hi", function () {
				resume(function () {
					assertEqual( 1, fixture.find(".error").length )
					assertEqual( "Password is too short", fixture.find(".error").text() )
				})
			})
		}})

		it("doesn't trigger validation using val() [-interactive_validator_spec:2-]", function () { with (this) {
			fixture.find("[name=password]").val("hi")
			assertEqual( 0, fixture.find(".error").length )
		}})
	}})
}
