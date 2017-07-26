with (JS.Test) {
	describe("jQuery", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.fixture = $("#fixture")
			fixture.html('<p class="message">Hello</p>')
			this.p = fixture.find("p")
		}})

		after(function () { with (this) {
			fixture.empty()
		}})

		describe("#hasClass", function () { with (this) { addSkip(this)
			it("returns true for existing classes", function () { with (this) {
				assert( p.hasClass("message") )
			}})

			it("returns false for non-existent classes", function () { with (this) {
				assertNot( p.hasClass("error") )
			}})
		}})

		describe("#text", function () { with (this) { addSkip(this)
			it("returns the node's inner text", function () { with (this) {
				assertEqual( "Hello", p.text() )
			}})
		}})
	}})
}

