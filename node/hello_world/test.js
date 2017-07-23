// test plan works in node and included in test.html from a browser
var JS = JS || require("jstest")

JS.Test.describe("Hello, world!", function() { with(this) {
  it("runs a test", function() { with(this) {
    assertEqual( "Hello, world!", ["Hello", "world!"].join(", ") )
  }})
}})

JS.Test.autorun()

