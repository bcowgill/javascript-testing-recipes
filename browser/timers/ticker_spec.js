with (JS.Test) {
	describe("Ticker [-ticker_spec:0-]", function () { with (this) { addSkip(this)
		extend(HtmlFixture)

		fixture(' <ul class="test-list"></ul> ')

		include(JS.Test.FakeClock)

		before(function () { this.clock.stub() })
		after(function () { this.clock.reset() })

		before(function () { with (this) {
			this.ticker = new Ticker(".test-list", ["Uno", "Dos", "Tres"])
		}})

		it("shows no messages at first [-ticker_spec:1-]", function () { with (this) {
			var messages = $.map(fixture.find("li"), function (li) { return $(li).text() })
			assertEqual( [], messages )
		}})

		it("reveals one message each second [-ticker_spec:2-]", function () { with (this) {
			clock.tick(1100)
			var messages = $.map(fixture.find("li"), function (li) { return $(li).text() })
			assertEqual( ["Uno"], messages )

			clock.tick(1000)
			messages = $.map(fixture.find("li"), function (li) { return $(li).text() })
			assertEqual( ["Uno", "Dos"], messages )

			clock.tick(1000)
			messages = $.map(fixture.find("li"), function (li) { return $(li).text() })
			assertEqual( ["Uno", "Dos", "Tres"], messages )
		}})
	}})
}
