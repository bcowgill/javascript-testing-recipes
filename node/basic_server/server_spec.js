var JS     = require("jstest"),
    server = require("./server"),
    steps  = require("./server_steps")

JS.Test.describe("server [-server_spec:0-]", function() { with(this) {
  include(steps)

  before(function() { with(this) {
    startServer(server)
  }})

  after(function() { with(this) {
    stopServer()
  }})

  it("returns the query parameters as JSON [-server_spec:1-]", function() { with(this) {
    get("/", {hello: "world", something: "else"})
    checkStatus(200)
    checkJSON({hello: "world", something: "else"})
  }})
}})

