var JS    = require("jstest"),
    app   = require("../app"),
    steps = require("./server_steps")

var redisConfig = {host: "127.0.0.1", port: 6379, database: 15},
    server      = app({redis: redisConfig})

JS.Test.describe("POST /users", function() { with(this) {
  include(steps)

  before(function() { with(this) {
    startServer(server)
  }})

  after(function() { with(this) {
    stopServer()
    cleanDatabase(redisConfig)
  }})

  it("rejects missing usernames", function() { with(this) {
    post("/users", {})
    checkStatus(409)
    checkJSON({errors: ["Usernames may only contain letters, numbers and underscores"]})
  }})

  it("rejects invalid usernames", function() { with(this) {
    post("/users", {username: "$%^&"})
    checkStatus(409)
    checkJSON({errors: ["Usernames may only contain letters, numbers and underscores"]})
  }})

  it("accepts new usernames and returns a new ID", function() { with(this) {
    post("/users", {username: "alice"})
    checkStatus(201)
    checkJSON({id: 1, username: "alice"})

    post("/users", {username: "bob"})
    checkStatus(201)
    checkJSON({id: 2, username: "bob"})
  }})

  it("returns the existing ID for registered usernames", function() { with(this) {
    post("/users", {username: "alice"})
    post("/users", {username: "alice"})
    checkStatus(200)
    checkJSON({id: 1, username: "alice"})
  }})
}})

