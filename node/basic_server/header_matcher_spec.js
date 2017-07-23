var JS      = require("jstest"),
    headers = require("./header_matcher")

JS.Test.describe("headers()", function() { with(this) {
  before(function() { with(this) {
    this.cacheControl = headers({"Cache-Control": "no-store"})
    this.contentType  = headers({"Content-Type":  match(/^application\/json(;|$)/)})
  }})

  it("matches if the headers contain an exact match", function() { with(this) {
    assertEqual( cacheControl, {"Cache-Control": "no-store"} )
  }})

  it("matches if the headers contain a case-insensitive match", function() { with(this) {
    assertEqual( cacheControl, {"cache-control": "no-store"} )
  }})

  it("matches if the headers contain additional fields", function() { with(this) {
    assertEqual( cacheControl, {"Cache-Control": "no-store", "Host": "localhost"} )
  }})

  it("does not match if the header is missing", function() { with(this) {
    assertNotEqual( cacheControl, {} )
  }})

  it("does not match if the header has the wrong value", function() { with(this) {
    assertNotEqual( cacheControl, {"Cache-Control": "no-cache"} )
  }})

  it("matches correctly if the value is a matcher", function() { with(this) {
    assertEqual(    contentType, {"Content-Type": "application/json"} )
    assertEqual(    contentType, {"Content-Type": "application/json; charset=utf-8"} )
    assertNotEqual( contentType, {"Content-Type": "text/html"} )
  }})
}})
      
