with (JS.Test) {
	describe("DOM fixtures", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.fixture = $("#fixture")
			fixture.append('<p class="message">Hello</p>')
		}})

		after(function () { with (this) {
			fixture.empty()
		}})

		it("creates a paragraph saying 'Hello'", function () { with (this) {
			assertEqual( "Hello", fixture.find("p").text() )
		}})

		it("creates a paragraph with a 'message' class", function () { with (this) {
			assert( fixture.find("p").hasClass("message") )
		}})

		it("creates exactly one paragraph", function () { with (this) {
			assertEqual( 1, fixture.find("p").length )
		}})
	}})
}
