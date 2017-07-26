var JS        = require("jstest"),
    Announcer = require("./announcer")

JS.Test.describe("Announcer [-announcer_spec:0-]", function() { with(this) {
  before(function() { with(this) {
    this.announcer = new Announcer("Attention passengers")
  }})

  it("broadcasts an announcement [-announcer_spec:1-]", function() { with(this) {
    var message = null
    announcer.on("message", function(m) { message = m })
    announcer.announce("there is free cake in the ticket office")
    assertEqual( "Attention passengers, there is free cake in the ticket office", message )
  }})
}})

