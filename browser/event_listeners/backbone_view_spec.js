with (JS.Test) {
	describe("Backbone view [-backbone_view_spec:0-]", function () { with (this) { addSkip(this)
		extend(HtmlFixture)

		fixture(' <a href="/">Home</a> \
							<h2></h2> ')

		before(function () { with (this) {
			this.view = new View({el: fixture})
		}})

		it("changes the heading to the link text [-backbone_view_spec:1-]", function (resume) { with (this) {
			Syn.click(fixture.find("a"), function () {
				resume(function () {
					assertEqual( "Home", fixture.find("h2").text() )
				})
			})
		}})

		describe("handleLinkClick() [-backbone_view_spec:2-]", function () { with (this) { addSkip(this)
			it("prevents the default click behaviour [-backbone_view_spec:3-]", function () { with (this) {
				var event = {}
				expect(event, "preventDefault")
				view.handleLinkClick(event)
			}})

			it("sets the heading text [-backbone_view_spec:4-]", function () { with (this) {
				var event = {target: fixture.find("a").get(0)}
				stub(event, "preventDefault")
				view.handleLinkClick(event)
				assertEqual( "Home", fixture.find("h2").text() )
			}})
		}})
	}})
}
