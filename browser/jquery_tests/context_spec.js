with (JS.Test) {
	describe("jQuery [-context_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.fixture = $("#fixture")
			fixture.html('<p>Hello</p>')
			this.p = fixture.find("p")
		}})

		after(function () { with (this) {
			fixture.empty()
		}})

		describe("with a 'message' class [-context_spec:1-]", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				p.addClass("message")
			}})

			it("returns true for existing classes [-context_spec:2-]", function () { with (this) {
				assert( p.hasClass("message") )
			}})
		}})

		describe("without a 'message' class [-context_spec:3-]", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				// no-op
			}})

			it("returns false for non-existent classes [-context_spec:4-]", function () { with (this) {
				assertNot( p.hasClass("message") )
			}})
		}})
	}})
}

