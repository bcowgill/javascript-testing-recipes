with (JS.Test) {
	describe("Ticker (slow) [-ticker_slow_spec:0-]", function () { with (this) { addSkip(this)
		extend(HtmlFixture)

		fixture(' <ul class="test-list"></ul> ')

		before(function () { with (this) {
			this.ticker = new Ticker(".test-list", ["Uno", "Dos", "Tres"])
		}})

		after(function () { with (this) {
			ticker.stop()
		}})

		it("shows no messages at first [-ticker_slow_spec:1-]", function () { with (this) {
			var messages = $.map(fixture.find("li"), function (li) { return $(li).text() })
			assertEqual( [], messages )
		}})

		it("reveals one message each second [-ticker_slow_spec:2-]", function (resume) { with (this) {
			setTimeout(function () {
				resume(function (resume) {
					var messages = $.map(fixture.find("li"), function (li) { return $(li).text() })
					assertEqual( ["Uno"], messages )

					setTimeout(function () {
						resume(function (resume) {
							messages = $.map(fixture.find("li"), function (li) { return $(li).text() })
							assertEqual( ["Uno", "Dos"], messages )

							setTimeout(function () {
								resume(function () {
									messages = $.map(fixture.find("li"), function (li) { return $(li).text() })
									assertEqual( ["Uno", "Dos", "Tres"], messages )
								})
							}, 1000)
						})
					}, 1000)
				})
			}, 1100)
		}})
	}})
}
