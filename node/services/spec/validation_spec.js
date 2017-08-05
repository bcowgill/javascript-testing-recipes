var JS         = require("jstest"),
	validation = require("../lib/validation")

with (JS.Test) {
	describe("validation [-validation_spec:0-]", function () { with (this) { addSkip(this)
		describe("checkUser() [-validation_spec:1-]", function () { with (this) { addSkip(this)
			it("accepts valid usernames [-validation_spec:2-]", function () { with (this) {
				assertNull( validation.checkUser({username: "carol"}) )
			}})

			it("rejects invalid usernames [-validation_spec:3-]", function () { with (this) {
				assertEqual( ["Usernames may only contain letters, numbers and underscores"],
					 validation.checkUser({username: "**"}) )
			}})

			it("rejects missing usernames [-validation_spec:4-]", function () { with (this) {
				assertEqual( ["Usernames may only contain letters, numbers and underscores"],
					 validation.checkUser({}) )
			}})
		}})

		describe("checkMessage() [-validation_spec:5-]", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				this.message = {userId: 1, roomName: "lounge", message: "Hi"}
			}})

			it("accepts messages with a userId, room name and some text [-validation_spec:6-]", function () { with (this) {
				assertNull( validation.checkMessage(message) )
			}})

			it("rejects messages with no room name [-validation_spec:7-]", function () { with (this) {
				delete message.roomName
				assertEqual( ["Rooms may only contain letters, numbers and underscores"],
					 validation.checkMessage(message) )
			}})
		}})

		describe("checkPoll() [-validation_spec:8-]", function () { with (this) { addSkip(this)
			it("accepts a message query with a room name and timestamp [-validation_spec:9-]", function () { with (this) {
				assertNull( validation.checkPoll({roomName: "kitchen", since: 1234567890123}) )
			}})

			it("rejects non-numeric 'since' values [-validation_spec:10-]", function () { with (this) {
				assertEqual( ["The 'since' parameter must be a valid timestamp"],
					 validation.checkPoll({roomName: "kitchen", since: "whenever"}) )
			}})

			it("rejects 'since' values which are too old [-validation_spec:11-]", function () { with (this) {
				assertEqual( ["The 'since' parameter must be a valid timestamp"],
					 validation.checkPoll({roomName: "kitchen", since: 42}) )
			}})
		}})
	}})
}

