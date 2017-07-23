var JS      = require("jstest"),
    server  = require("./server"),
    headers = require("./header_matcher"),
    json    = require("./json_matcher")

JS.Test.describe("server (matchers)", function() { with(this) {
  it("returns the query parameters as JSON", function() { with(this) {
    var request  = {url: "/?hello=world&something=else"},
        response = {},
        header   = headers({"Content-Type": match(/^application\/json(;|$)/)})

    expect(response, "writeHead").given(200, header)
    expect(response, "end").given(json({hello: "world", something: "else"}))

    server.emit("request", request, response)
  }})
}})

