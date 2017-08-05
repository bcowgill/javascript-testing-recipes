var JS    = require("jstest"),
	app   = require("../app"),
	steps = require("../../chat_api/spec/server_steps")

with (JS.Test) {
	describe("POST /chat/:roomName [-post_message_spec:6-]", function () { with (this) { addSkip(this)
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

		it("returns a 409 Conflict if the input is invalid [-post_message_spec:7-]", function () { with (this) {
			expect(validation, "checkMessage")
				.given({roomName: "basement", message: "Hi, there!"})
				.returns(["Invalid message"])

			post("/chat/basement", {userId: "84", message: "Hi, there!"})
			checkStatus(409)
			checkJSON({errors: ["Invalid message"]})
		}})

		it("returns a 201 Created if the input is valid [-post_message_spec:8-]", function () { with (this) {
			expect(validation, "checkMessage")
				.given({roomName: "basement", message: "Hi, there!"})
				.returns(null)

			expect(chatService, "postMessage")
				.given("basement", "84", "Hi, there!", instanceOf("number"))
				.yields([null, {id: 99}])

			post("/chat/basement", {userId: "84", message: "Hi, there!"})
			checkStatus(201)
			checkJSON({id: 99})
		}})
	}})
}

