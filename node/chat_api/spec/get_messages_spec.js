var JS   = require("jstest"),
	app  = require("../app"),
	time = require("../lib/time")

	var redisConfig = {host: "127.0.0.1", port: 6379, database: 15},
		server      = app({redis: redisConfig})

with (JS.Test) {
	describe("GET /chat/:roomName [-get_messages_spec:0-]", function () { with (this) { addSkip(this)
		include(require("./server_steps"))

		before(function () { with (this) {
			startServer(server)
			post("/users", {username: "alice"})

			this.oldTime = 1000000000000
		}})

		after(function () { with (this) {
			stopServer()
			cleanDatabase(redisConfig)
		}})

		it("rejects requests with an invalid timestamp [-get_messages_spec:1-]", function () { with (this) {
			get("/chat/kitchen", {since: 1234})
			checkStatus(409)
			checkJSON({errors: ["The 'since' parameter must be a valid timestamp"]})
		}})

		describe("with messages in one room [-get_messages_spec:2-]", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				stub(time, "current").returns(1300000001000, 1300000002000, 1399999999999)
				post("/chat/kitchen", {userId: 1, message: "First"})
				post("/chat/kitchen", {userId: 1, message: "Second"})
			}})

			it("returns all the messages given an old timestamp [-get_messages_spec:3-]", function () { with (this) {
				get("/chat/kitchen", {since: oldTime})
				checkStatus(200)
				checkJSON({
					messages: [
						{id: 1, timestamp: 1300000001000, username: "alice", message: "First"},
						{id: 2, timestamp: 1300000002000, username: "alice", message: "Second"}
					]
				})
			}})

			it("returns messages since the given timestamp [-get_messages_spec:4-]", function () { with (this) {
				get("/chat/kitchen", {since: 1300000001500})
				checkStatus(200)
				checkJSON({
					messages: [
						{id: 2, timestamp: 1300000002000, username: "alice", message: "Second"}
					]
				})
			}})

			it("returns no messages for other rooms [-get_messages_spec:5-]", function () { with (this) {
				get("/chat/garage", {since: oldTime})
				checkJSON({messages: []})
			}})
		}})
	}})
}

