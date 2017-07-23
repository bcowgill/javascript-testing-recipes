var JS     = require("jstest"),
    Buzzer = require("./buzzer")

JS.Test.describe("Buzzer", function() { with(this) {
  before(function() { with(this) {
    this.buzzer = new Buzzer()
    this.called = null
  }})

  it("emits a 'buzz' when pressed", function() { with(this) {
    buzzer.on("buzz", function() { called = true })
    called = false
    buzzer.press()
    assert( called )
  }})
}})

