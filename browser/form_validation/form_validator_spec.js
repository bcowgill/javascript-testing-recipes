with (JS.Test) {
	describe("FormValidator", function () { with (this) { addSkip(this)
		extend(HtmlFixture)
		fixture(FORM_HTML)

		before(function () { with (this) {
			this.form = fixture.find("form").get(0)
			stub(form, "submit")
		}})

		it("extracts form data and passes it to the validator", function (resume) { with (this) {
			fixture.find("[name=email]").val("james@example.com")
			fixture.find("[name=password]").val("something")

			expect(this, "validator").given({email: "james@example.com", password: "something"})
			new FormValidator(form, validator)
			Syn.click(fixture.find("[type=submit]"), resume)
		}})

		describe("when the validator returns no errors", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				stub(this, "validator").returns({})
				new FormValidator(form, validator)
			}})

			it("submits the form", function (resume) { with (this) {
				expect(form, "submit").exactly(1)
				Syn.click(fixture.find("[type=submit]"), resume)
			}})
		}})

		describe("when the validator returns an error", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				stub(this, "validator").returns({email: "example.com addresses are not allowed"})
				new FormValidator(form, validator)
			}})

			it("doesn't submit the form", function (resume) { with (this) {
				expect(form, "submit").exactly(0)
				Syn.click(fixture.find("[type=submit]"), resume)
			}})

			it("displays the error", function (resume) { with (this) {
				Syn.click(fixture.find("[type=submit]"), function () {
					resume(function () {
						assertEqual( "example.com addresses are not allowed",
												 fixture.find(".error").text() )
				})})
			}})
		}})
	}})
}
