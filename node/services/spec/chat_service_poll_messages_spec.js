var JS          = require("jstest"),
	redis       = require("redis"),
	ChatService = require("../lib/chat_service"),
	UserService = require("../lib/user_service")

with (JS.Test) {
	describe("ChatService.pollMessages() [-chat_service_poll_messages_spec:0-]", function () { with (this) { addSkip(this)
		before(function (resume) { with (this) {
			this.db      = redis.createClient()
			this.users   = new UserService(db)
			this.service = new ChatService(db)
			this.now     = 1393101364563

			db.select(15)
			users.register("alice", function () { users.register("bob", resume) })
			this.ALICE = 1
			this.BOB   = 2
		}})

		after(function (resume) { with (this) {
			db.flushdb(resume)
		}})

		describe("with messages posted in a room [-chat_service_poll_messages_spec:1-]", function () { with (this) { addSkip(this)
			before(function (resume) { with (this) {
				service.postMessage("attic", ALICE, "First post!", now - 200, function () {
					service.postMessage("attic", BOB, "Anyone here?", now - 100, resume)
				})
			}})

			it("yields all the messages given an old timestamp [-chat_service_poll_messages_spec:2-]", function (resume) { with (this) {
				service.pollMessages("attic", now - 5000, now, function (error, messages) {
					resume(function () {
						assertEqual([
							{id: ALICE, username: "alice", timestamp: now - 200, message: "First post!"},
							{id: BOB, username: "bob", timestamp: now - 100, message: "Anyone here?"}
						], messages)
				})})
			}})

			it("does not yield messages older than the timestamp [-chat_service_poll_messages_spec:3-]", function (resume) { with (this) {
				service.pollMessages("attic", now - 150, now, function (error, messages) {
					resume(function () {
						assertEqual([
							{id: BOB, username: "bob", timestamp: now - 100, message: "Anyone here?"}
						], messages)
				})})
			}})

			it("yields no messages for other rooms [-chat_service_poll_messages_spec:4-]", function (resume) { with (this) {
				service.pollMessages("basement", now - 5000, now, function (error, messages) {
					resume(function () {
						assertEqual( [], messages )
				})})
			}})
		}})
	}})
}

