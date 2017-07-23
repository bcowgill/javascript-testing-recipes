var JS         = require("jstest"),
    validation = require("../lib/validation")

JS.Test.describe("validation", function() { with(this) {
  describe("checkUser()", function() { with(this) {
    it("accepts valid usernames", function() { with(this) {
      assertNull( validation.checkUser({username: "carol"}) )
    }})

    it("rejects invalid usernames", function() { with(this) {
      assertEqual( ["Usernames may only contain letters, numbers and underscores"],
                   validation.checkUser({username: "**"}) )
    }})

    it("rejects missing usernames", function() { with(this) {
      assertEqual( ["Usernames may only contain letters, numbers and underscores"],
                   validation.checkUser({}) )
    }})
  }})

  describe("checkMessage()", function() { with(this) {
    before(function() { with(this) {
      this.message = {userId: 1, roomName: "lounge", message: "Hi"}
    }})

    it("accepts messages with a userId, room name and some text", function() { with(this) {
      assertNull( validation.checkMessage(message) )
    }})

    it("rejects messages with no room name", function() { with(this) {
      delete message.roomName
      assertEqual( ["Rooms may only contain letters, numbers and underscores"],
                   validation.checkMessage(message) )
    }})
  }})

  describe("checkPoll()", function() { with(this) {
    it("accepts a message query with a room name and timestamp", function() { with(this) {
      assertNull( validation.checkPoll({roomName: "kitchen", since: 1234567890123}) )
    }})

    it("rejects non-numeric 'since' values", function() { with(this) {
      assertEqual( ["The 'since' parameter must be a valid timestamp"],
                   validation.checkPoll({roomName: "kitchen", since: "whenever"}) )
    }})
  }})
}})

