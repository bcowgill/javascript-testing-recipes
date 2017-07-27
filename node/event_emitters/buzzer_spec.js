var JS     = require("jstest"),
	Buzzer = require("./buzzer")

with (JS.Test) {
	describe("Buzzer [-buzzer_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.buzzer = new Buzzer()
			this.called = null
		}})

		it("emits a 'buzz' when pressed [-buzzer_spec:1-]", function () { with (this) {
			buzzer.on("buzz", function () { called = true })
			called = false
			buzzer.press()
			assert( called )
		}})
	}})
}
