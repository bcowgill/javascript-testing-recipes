JS.Test.describe("InteractiveValidator", function() { with(this) {
  extend(HtmlFixture)
  fixture(FORM_HTML)

  before(function() { with(this) {
    stub(this, "validator").returns({password: "Password is too short"})
    new InteractiveValidator(fixture.find("form"), validator)
  }})

  it("triggers validation using type()", function(resume) { with(this) {
    Syn.type(fixture.find("[name=password]"), "hi", function() {
      resume(function() {
        assertEqual( 1, fixture.find(".error").length )
        assertEqual( "Password is too short", fixture.find(".error").text() )
      })
    })
  }})

  it("doesn't trigger validation using val()", function() { with(this) {
    fixture.find("[name=password]").val("hi")
    assertEqual( 0, fixture.find(".error").length )
  }})
}})
