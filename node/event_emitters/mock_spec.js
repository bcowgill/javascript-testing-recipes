var JS     = require("jstest"),
	Buzzer = require("./buzzer")

with (JS.Test) {
	describe("Buzzer (mock) [-mock_spec:2-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.buzzer = new Buzzer()
		}})

		it("is an event emitter [-mock_spec:2a-]", function () { with (this) {
			assertRespondTo(buzzer, "emit")
		}})

		it("emits a 'buzz' when pressed [-mock_spec:3-]", function () { with (this) {
			expect(buzzer, "emit").given("buzz")
			buzzer.press()
		}})
	}})
}
