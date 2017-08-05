var JS    = require("jstest"),
	app   = require("../app"),
	steps = require("./browser_steps")

with (JS.Test) {
	describe("Signing up [-signup_spec:5-]", function () { with (this) { addSkip(this)
		include(steps)

		before(function () { with (this) {
			startServer(app)
			createBrowser()
		}})

		after(function () { with (this) {
			stopServer()
			cleanDatabase()
		}})

		it("redirects to the sign-up page when not logged in [-signup_spec:6-]", function () { with (this) {
			visit("/")
			checkPath("/signup")
		}})

		it("rejects invalid usernames [-signup_spec:7-]", function () { with (this) {
			visit("/signup")
			fillIn("[name=username]", "$%^&")
			clickButton("[type=submit]")
			checkText(".error li:first-child",
					"Usernames may only contain letters, numbers and underscores")
		}})

		it("rejects blank passwords [-signup_spec:8-]", function () { with (this) {
			visit("/signup")
			clickButton("[type=submit]")
			checkPath("/signup")
			checkText(".error li:last-child", "Password must not be blank")
		}})

		it("accepts valid sign-ups [-signup_spec:9-]", function () { with (this) {
			visit("/signup")
			fillIn("[name=username]", "alice")
			fillIn("[name=password]", "something")
			clickButton("[type=submit]")
			checkPath("/chat")
			checkText(".navigation li:first-child", "Logged in as alice")
		}})
	}})
}

