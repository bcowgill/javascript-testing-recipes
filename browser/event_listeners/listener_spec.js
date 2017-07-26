with (JS.Test) {
	describe("event listener [-listener_spec:0-]", function () { with (this) { addSkip(this)
		extend(HtmlFixture)
		fixture(' <a href="/">Home</a> ')

		it("changes the heading to the link text [-listener_spec:1-]", function (resume) { with (this) {
			var widget = new Widget(fixture)
			expect(widget, "changeHeading").given("Home")
			var link = fixture.find("a").get(0)
			Syn.click(link, resume)
		}})
	}})
}
