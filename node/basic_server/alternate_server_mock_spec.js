var JS     = require("jstest"),
    server = require("./alternate_server")

JS.Test.describe("alternate server (mocking)", function() { with(this) {
  it("returns the query parameters as JSON", function() { with(this) {
    var request  = {url: "/?hello=world&something=else"},
        response = {}

    expect(response, "setHeader").given("Content-Type", "application/json")
    expect(response, "write").given('{\n  "hello": "world",\n  "something": "else"\n}')
    expect(response, "end")

    server.emit("request", request, response)
    assertEqual( 200, response.statusCode )
  }})
}})

