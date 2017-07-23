var JS          = require("jstest"),
    redis       = require("redis"),
    ChatService = require("../lib/chat_service"),
    UserService = require("../lib/user_service")

JS.Test.describe("ChatService.postMessage()", function() { with(this) {
  before(function(resume) { with(this) {
    this.db      = redis.createClient()
    this.users   = new UserService(db)
    this.service = new ChatService(db)
    this.now     = 1393101364563

    db.select(15)
    users.register("bob", resume)
  }})

  after(function(resume) { with(this) {
    db.flushdb(resume)
  }})

  it("does not post the message given an unknown user ID", function(resume) { with(this) {
    service.postMessage("garage", 2, "Hello", now, function(error, message) {
      resume(function(resume) {
        assertEqual( "User #2 does not exist", error.message )
        assertEqual( undefined, message )

        service.pollMessages("garage", now - 10, now + 10, function(error, messages) {
          resume(function() { assertEqual( [], messages ) })
    })})})
  }})

  it("posts the message with a valid user ID", function(resume) { with(this) {
    service.postMessage("garage", 1, "Hello", now, function(error, message) {
      resume(function(resume) {
        assertNull( error )
        assertEqual( {id: 1, timestamp: now, message: "Hello"}, message )

        service.pollMessages("garage", now - 10, now + 10, function(error, messages) {
          resume(function() {
            assertEqual( [{id: 1, username: "bob", timestamp: now, message: "Hello"}],
                         messages )
    })})})})
  }})
}})

