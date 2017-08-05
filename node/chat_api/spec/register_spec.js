var JS    = require("jstest"),
	app   = require("../app"),
	steps = require("./server_steps")

var redisConfig = {host: "127.0.0.1", port: 6379, database: 15},
	server      = app({redis: redisConfig})

with (JS.Test) {
	describe("POST /users [-register_spec:0-]", function () { with (this) { addSkip(this)
		include(steps)

		before(function () { with (this) {
			startServer(server)
		}})

		after(function () { with (this) {
			stopServer()
			cleanDatabase(redisConfig)
		}})

		it("rejects missing usernames [-register_spec:1-]", function () { with (this) {
			post("/users", {})
			checkStatus(409)
			checkJSON({errors: ["Usernames may only contain letters, numbers and underscores"]})
		}})

		it("rejects invalid usernames [-register_spec:2-]", function () { with (this) {
			post("/users", {username: "$%^&"})
			checkStatus(409)
			checkJSON({errors: ["Usernames may only contain letters, numbers and underscores"]})
		}})

		it("accepts new usernames and returns a new ID [-register_spec:3-]", function () { with (this) {
			post("/users", {username: "alice"})
			checkStatus(201)
			checkJSON({id: 1, username: "alice"})

			post("/users", {username: "bob"})
			checkStatus(201)
			checkJSON({id: 2, username: "bob"})
		}})

		it("returns the existing ID for registered usernames [-register_spec:4-]", function () { with (this) {
			post("/users", {username: "alice"})
			post("/users", {username: "alice"})
			checkStatus(200)
			checkJSON({id: 1, username: "alice"})
		}})
	}})
}

