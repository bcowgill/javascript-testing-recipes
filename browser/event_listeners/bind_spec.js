with (JS.Test) {
	describe("bindLinkEvents() [-bind_spec:0-]", function () { with (this) { addSkip(this)
		extend(HtmlFixture)

		fixture(' <a href="/">Home</a> \
							<h2></h2> ')

		it("displays the text of a clicked link [-bind_spec:1-]", function (resume) { with (this) {
			bindLinkEvents(fixture)
			Syn.click(fixture.find("a"), function () {
				resume(function () {
					assertEqual( "Home", fixture.find("h2").text() )
				})
			})
		}})
	}})
}
