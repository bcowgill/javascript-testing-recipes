var JS     = require("jstest"),
    server = require("./server"),
    steps  = require("./server_steps")

JS.Test.describe("server", function() { with(this) {
  include(steps)

  before(function() { with(this) {
    startServer(server)
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

