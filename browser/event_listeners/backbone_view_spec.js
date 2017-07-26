with (JS.Test) {
	describe("Backbone view", function () { with (this) { addSkip(this)
		extend(HtmlFixture)

		fixture(' <a href="/">Home</a> \
							<h2></h2> ')

		before(function () { with (this) {
			this.view = new View({el: fixture})
		}})

		it("changes the heading to the link text", function (resume) { with (this) {
			Syn.click(fixture.find("a"), function () {
				resume(function () {
					assertEqual( "Home", fixture.find("h2").text() )
				})
			})
		}})

		describe("handleLinkClick()", function () { with (this) { addSkip(this)
			it("prevents the default click behaviour", function () { with (this) {
				var event = {}
				expect(event, "preventDefault")
				view.handleLinkClick(event)
			}})

			it("sets the heading text", function () { with (this) {
				var event = {target: fixture.find("a").get(0)}
				stub(event, "preventDefault")
				view.handleLinkClick(event)
				assertEqual( "Home", fixture.find("h2").text() )
			}})
		}})
	}})
}
