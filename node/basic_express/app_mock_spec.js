var JS  = require("jstest"),
    app = require("./app")

JS.Test.describe("Express app (mocking) [-app_mock_spec:0-]", function() { with(this) {
  it("returns the query parameters as JSON [-app_mock_spec:1-]", function() { with(this) {
    var request = {
      method:  "GET",
      url:     "/?hello=world&something=else",
      headers: {}
    }
  
    var response = {_headers: {}}

    expect(response, "setHeader").given("Content-Length", "45")
    expect(response, "setHeader").given("Content-Type",   "text/html")
    expect(response, "setHeader").given("Content-Type",   "application/json")
    expect(response, "setHeader").given("ETag",           '"-917058233"')
    expect(response, "setHeader").given("X-Powered-By",   "Express")

    expect(response, "end").given('{\n  "hello": "world",\n  "something": "else"\n}')

    app.emit("request", request, response)

    assertEqual( 200, response.statusCode )
  }})
}})

