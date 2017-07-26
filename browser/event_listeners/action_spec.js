with (JS.Test) {
	describe("changeHeading() [-action_spec:0-]", function () { with (this) { addSkip(this)
		extend(HtmlFixture)
		fixture(' <h2></h2> ')

		it("changes the heading text [-action_spec:1-]", function () { with (this) {
			var widget = new Widget(fixture)
			widget.changeHeading("Welcome to Coventry")
			assertEqual( "Welcome to Coventry", fixture.find("h2").text() )
		}})
	}})
}
