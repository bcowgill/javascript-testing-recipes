with (JS.Test) {
	describe("DOM fixtures [-dom_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.fixture = $("#fixture")
			fixture.append('<p class="message">Hello</p>')
		}})

		after(function () { with (this) {
			fixture.empty()
		}})

		it("creates a paragraph saying 'Hello' [-dom_spec:1-]", function () { with (this) {
			assertEqual( "Hello", fixture.find("p").text() )
		}})

		it("creates a paragraph with a 'message' class [-dom_spec:2-]", function () { with (this) {
			assert( fixture.find("p").hasClass("message") )
		}})

		it("creates exactly one paragraph [-dom_spec:3-]", function () { with (this) {
			assertEqual( 1, fixture.find("p").length )
		}})
	}})
}
