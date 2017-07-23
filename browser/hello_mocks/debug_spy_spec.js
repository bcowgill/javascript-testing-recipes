JS.Test.describe("debug() with spies", function() { with(this) {
  before(function() { with(this) {
    sinon.spy(console, "info")
  }})

  after(function() { with(this) {
    console.info.restore()
  }})

  it("writes the message to the console with a timestamp", function() { with(this) {
    debug("hello")
    sinon.assert.calledWithMatch(console.info, /^[0-9]{13} hello$/)
  }})
}})

