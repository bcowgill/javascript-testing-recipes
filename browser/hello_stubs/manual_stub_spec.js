with (JS.Test) {
	describe("Manual stubbing [-manual_stub_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.fixture = $("#fixture")
			fixture.html('  <p></p>\
				<a href="/">Home</a>')

			this.jqueryGet = $.get
			$.get = function (url, callback) {
				callback("Hello from the server")
			}

			hijackLink("#fixture a", "#fixture p")
		}})

		after(function () { with (this) {
			fixture.empty()
			$.get = jqueryGet
		}})

		describe("when the link is clicked [-manual_stub_spec:1-]", function () { with (this) { addSkip(this)
			before(function (resume) { with (this) {
				Syn.click(fixture.find("a"), resume)
			}})

			it("displays the server response [-manual_stub_spec:2-]", function () { with (this) {
				assertEqual( "Hello from the server", fixture.find("p").text() )
			}})
		}})
	}})
}

