with (JS.Test) {
	describe("jQuery [-jquery_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.fixture = $("#fixture")
			fixture.html('<p class="message">Hello</p>')
			this.p = fixture.find("p")
		}})

		after(function () { with (this) {
			fixture.empty()
		}})

		describe("#hasClass [-jquery_spec:1-]", function () { with (this) { addSkip(this)
			it("returns true for existing classes [-jquery_spec:2-]", function () { with (this) {
				assert( p.hasClass("message") )
			}})

			it("returns false for non-existent classes [-jquery_spec:3-]", function () { with (this) {
				assertNot( p.hasClass("error") )
			}})
		}})

		describe("#text [-jquery_spec:4-]", function () { with (this) { addSkip(this)
			it("returns the node's inner text [-jquery_spec:5-]", function () { with (this) {
				assertEqual( "Hello", p.text() )
			}})
		}})
	}})
}

