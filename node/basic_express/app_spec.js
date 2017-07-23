var JS    = require("jstest"),
    app   = require("./app"),
    steps = require("../basic_server/server_steps")

JS.Test.describe("Express app", function() { with(this) {
  include(steps)

  before(function() { with(this) {
    startServer(app)
  }})

  after(function() { with(this) {
    stopServer()
  }})

  it("returns the query parameters as JSON", function() { with(this) {
    get("/", {hello: "world", something: "else"})
    checkStatus(200)
    checkJSON({hello: "world", something: "else"})
  }})
}})

