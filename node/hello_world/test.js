// test plan works in node and included in test.html from a browser
var JS = JS || require("jstest")

with (JS.Test) {
	describe("Hello, world! [-test:19-]", function() { with(this) {
		it("runs a test [-test:20-]", function() { with(this) {
			assertEqual( "Hello, world!", ["Hello", "world!"].join(", ") )
		}})
		it("skips a test [-test:21-]")
/*
		it("fails a test [-test:22-]", function() { with(this) {
			assertEqual( "Hello, world!", ["Hello", "world!"].join(",  ") )
		}})
*/
	}})
	autorun()
}

