var JS   = require("jstest"),
    app  = require("../app"),
    time = require("../lib/time")

var redisConfig = {host: "127.0.0.1", port: 6379, database: 15},
    server      = app({redis: redisConfig})

JS.Test.describe("POST /chat/:roomName", function() { with(this) {
  include(require("./server_steps"))

  before(function() { with(this) {
    startServer(server)
    post("/users", {username: "alice"})
    this.payload = {userId: 1, message: "Hi there"}
  }})

  after(function() { with(this) {
    stopServer()
    cleanDatabase(redisConfig)
  }})

  it("rejects invalid room names", function() { with(this) {
    post("/chat/not-ok", payload)
    checkStatus(409)
    checkJSON({errors: ["Rooms may only contain letters, numbers and underscores"]})
  }})

  it("rejects non-existent user IDs", function() { with(this) {
    payload.userId = 2
    post("/chat/lounge", payload)
    checkStatus(409)
    checkJSON({errors: ["User #2 does not exist"]})
  }})

  it("accepts valid messages", function() { with(this) {
    stub(time, "current").returns(1392747231870)
    post("/chat/lounge", payload)
    checkStatus(201)
    checkJSON({id: 1, timestamp: 1392747231870, message: "Hi there"})
  }})

  it("posts acceptable messages", function() { with(this) {
    stub(time, "current").returns(1392747231870)
    post("/chat/lounge", payload)
    get("/chat/lounge", {since: 1000000000000})
    checkJSON({
      messages: [{
        id:        1,
        timestamp: 1392747231870,
        username:  "alice",
        message:   "Hi there"
      }]
    })
  }})

  it("does not post invalid messages", function() { with(this) {
    payload.message = "    "
    post("/chat/lounge", payload)
    get("/chat/lounge", {since: 1000000000000})
    checkJSON({messages: []})
  }})
}})

