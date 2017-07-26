var JS     = require("jstest"),
    Buzzer = require("./buzzer")

JS.Test.describe("Buzzer (mock) [-mock_spec:2-]", function() { with(this) {
  before(function() { with(this) {
    this.buzzer = new Buzzer()
  }})

  it("emits a 'buzz' when pressed [-mock_spec:3-]", function() { with(this) {
    expect(buzzer, "emit").given("buzz")
    buzzer.press()
  }})
}})

