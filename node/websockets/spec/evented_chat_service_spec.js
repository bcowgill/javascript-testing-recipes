var JS          = require("jstest"),
    store       = require("../../orm/store"),
    User        = require("../../orm/persisted_user"),
    ChatService = require("../lib/evented_chat_service")

JS.Test.describe("EventedChatService", function() { with(this) {
  before(function(resume) { with(this) {
    this.service = new ChatService(store.getConnection())
    this.user = new User({username: "james", password: "x", workFactor: 1})
    user.save(resume)
  }})

  after(function(resume) { with(this) {
    store.getConnection().flushdb(resume)
  }})

  it("emits an event after publishing a message", function(resume) { with(this) {
    var timestamp = Date.now()

    expect(service, "emit").given("message", {
      room: "garage",
      chat: {id: 1, message: "knock knock", timestamp: timestamp, username: "james"}
    })
    service.postMessage("garage", user.id, "knock knock", timestamp, resume)
  }})
}})

