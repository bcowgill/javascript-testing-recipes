var JS     = require("jstest"),
    server = require("./server")

JS.Test.describe("server (mocking)", function() { with(this) {
  it("returns the query parameters as JSON", function() { with(this) {
    var request  = {url: "/?hello=world&something=else"},
        response = {}

    expect(response, "writeHead").given(200, {"Content-Type": "application/json"})
    expect(response, "end").given('{\n  "hello": "world",\n  "something": "else"\n}')

    server.emit("request", request, response)
  }})
}})

