var JS      = require("jstest"),
    headers = require("./header_matcher")

JS.Test.describe("headers() [-header_matcher_spec:0-]", function() { with(this) {
  before(function() { with(this) {
    this.cacheControl = headers({"Cache-Control": "no-store"})
    this.contentType  = headers({"Content-Type":  match(/^application\/json(;|$)/)})
  }})

  it("matches if the headers contain an exact match [-header_matcher_spec:1-]", function() { with(this) {
    assertEqual( cacheControl, {"Cache-Control": "no-store"} )
  }})

  it("matches if the headers contain a case-insensitive match [-header_matcher_spec:2-]", function() { with(this) {
    assertEqual( cacheControl, {"cache-control": "no-store"} )
  }})

  it("matches if the headers contain additional fields [-header_matcher_spec:3-]", function() { with(this) {
    assertEqual( cacheControl, {"Cache-Control": "no-store", "Host": "localhost"} )
  }})

  it("does not match if the header is missing [-header_matcher_spec:4-]", function() { with(this) {
    assertNotEqual( cacheControl, {} )
  }})

  it("does not match if the header has the wrong value [-header_matcher_spec:5-]", function() { with(this) {
    assertNotEqual( cacheControl, {"Cache-Control": "no-cache"} )
  }})

  it("matches correctly if the value is a matcher [-header_matcher_spec:6-]", function() { with(this) {
    assertEqual(    contentType, {"Content-Type": "application/json"} )
    assertEqual(    contentType, {"Content-Type": "application/json; charset=utf-8"} )
    assertNotEqual( contentType, {"Content-Type": "text/html"} )
  }})
}})
      
