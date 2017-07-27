var HtmlFixture = {
	fixture: function (html) {
		this.before(function () {
			var fixture = $("#fixture")

			if (fixture.length === 0) {
				$("body").prepend('<div id="fixture"></div>')
				fixture = $("#fixture")
			}
			this.fixture = fixture
			this.fixture.html(html)
		})

		this.after(function () {
			this.fixture.empty()
		})
	}
}

