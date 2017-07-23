var JS     = require("jstest"),
    Buzzer = require("./buzzer")

JS.Test.describe("Buzzer (mock)", function() { with(this) {
  before(function() { with(this) {
    this.buzzer = new Buzzer()
  }})

  it("emits a 'buzz' when pressed", function() { with(this) {
    expect(buzzer, "emit").given("buzz")
    buzzer.press()
  }})
}})

