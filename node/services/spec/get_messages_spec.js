var JS    = require("jstest"),
	app   = require("../app"),
	steps = require("../../chat_api/spec/server_steps")

with (JS.Test) {
	describe("GET /chat/:roomName [-get_messages_spec:6-]", function () { with (this) { addSkip(this)
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

		it("returns a 409 Conflict if the input is invalid [-get_messages_spec:7-]", function () { with (this) {
			expect(validation, "checkPoll")
					.given({roomName: "basement", since: 1234})
					.returns(["Invalid request"])

			get("/chat/basement", {since: "1234"})
			checkStatus(409)
			checkJSON({errors: ["Invalid request"]})
		}})

		it("returns a 200 OK if the input is valid [-get_messages_spec:8-]", function () { with (this) {
			expect(validation, "checkPoll")
					.given({roomName: "basement", since: 1234})
					.returns(null)

			expect(chatService, "pollMessages")
					.given("basement", 1234, instanceOf("number"))
					.yields([null, [{id: 1}, {id: 2}]])

			get("/chat/basement", {since: "1234"})
			checkStatus(200)
			checkJSON({messages: [{id: 1}, {id: 2}]})
		}})
	}})
}

