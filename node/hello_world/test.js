// test plan works in node and included in test.html from a browser
var JS = JS || require("jstest")

with (JS.Test) {
	describe("Hello, world!", function() { with(this) {
		it("runs a test", function() { with(this) {
			assertEqual( "Hello, world!", ["Hello", "world!"].join(", ") )
		}})
		it("skips a test")
/*
		it("fails a test", function() { with(this) {
			assertEqual( "Hello, world!", ["Hello", "world!"].join(",  ") )
		}})
*/
	}})
	autorun()
}

