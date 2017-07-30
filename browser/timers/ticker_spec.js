with (JS.Test) {
	describe("Ticker [-ticker_spec:0-]", function () { with (this) { addSkip(this)
		extend(HtmlFixture)

		fixture(' <ul class="test-list"></ul> ')

		include(JS.Test.FakeClock)

		function getMessages () {
			var messages = $.map(this.fixture.find("li"), function (li) { return $(li).text() })
			return messages
		}

		before(function () { this.clock.stub() })
		after(function () { this.clock.reset() })

		before(function () { with (this) {
			this.ticker = new Ticker(".test-list", ["Uno", "Dos", "Tres"])
		}})

		it("shows no messages at first [-ticker_spec:1-]", function () { with (this) {
			var messages = getMessages.call(this)
			assertEqual( [], messages )
		}})

		it("reveals one message each second [-ticker_spec:2-]", function () { with (this) {
			clock.tick(1100)
			var messages = getMessages.call(this)
			assertEqual( ["Uno"], messages )

			clock.tick(1000)
			messages = getMessages.call(this)
			assertEqual( ["Uno", "Dos"], messages )

			clock.tick(1000)
			messages = getMessages.call(this)
			assertEqual( ["Uno", "Dos", "Tres"], messages )
		}})
	}})
}
