var JS    = require("jstest"),
	app   = require("../app"),
	steps = require("../../chat_api/spec/server_steps")

with (JS.Test) {
	describe("POST /users [-register_spec:5-]", function () { with (this) { addSkip(this)
		include(steps)

		before(function () { with (this) {
			this.validation  = {}
			this.userService = {}
			this.chatService = {}

			this.app = app(validation, userService, chatService)
			startServer(app)
		}})

		after(function () { with (this) {
			stopServer(app)
		}})

		it("returns a 409 Conflict if the input is invalid [-register_spec:6-]", function () { with (this) {
			expect(validation, "checkUser").given({username: "zack"}).returns(["Invalid username"])

			post("/users", {username: "zack"})
			checkStatus(409)
			checkJSON({errors: ["Invalid username"]})
		}})

		it("returns a 201 Created if the user is valid and new [-register_spec:7-]", function () { with (this) {
			expect(validation, "checkUser").given({username: "zack"}).returns(null)
			expect(userService, "register").given("zack").yields([null, true, {id: 1}])

			post("/users", {username: "zack"})
			checkStatus(201)
			checkJSON({id: 1})
		}})

		it("returns a 200 OK if the user is valid and not new [-register_spec:8-]", function () { with (this) {
			expect(validation, "checkUser").given({username: "zack"}).returns(null)
			expect(userService, "register").given("zack").yields([null, false, {id: 1}])

			post("/users", {username: "zack"})
			checkStatus(200)
			checkJSON({id: 1})
		}})

		it("returns a 500 if the user service fails [-register_spec:9-]", function () { with (this) {
			expect(validation, "checkUser").given({username: "zack"}).returns(null)
			expect(userService, "register").given("zack").yields([new Error("DB is offline")])

			post("/users", {username: "zack"})
			checkStatus(500)
			checkJSON({errors: ["DB is offline"]})
		}})
	}})
}

