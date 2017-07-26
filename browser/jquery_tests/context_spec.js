with (JS.Test) {
	describe("jQuery", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.fixture = $("#fixture")
			fixture.html('<p>Hello</p>')
			this.p = fixture.find("p")
		}})

		after(function () { with (this) {
			fixture.empty()
		}})

		describe("with a 'message' class", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				p.addClass("message")
			}})

			it("returns true for existing classes", function () { with (this) {
				assert( p.hasClass("message") )
			}})
		}})

		describe("without a 'message' class", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				// no-op
			}})

			it("returns false for non-existent classes", function () { with (this) {
				assertNot( p.hasClass("message") )
			}})
		}})
	}})
}

