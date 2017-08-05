var JS    = require("jstest"),
	app   = require("../app"),
	User  = require("../../orm/persisted_user"),
	steps = require("./browser_steps")

with (JS.Test) {
	describe("Logging in [-login_spec:3-]", function () { with (this) { addSkip(this)
		include(steps)

		before(function () { with (this) {
			this.user = new User({username: "alice"}, 61)
			stub(User, "findById").given(61).yields([null, user])
			stub(User, "findByUsername").given("alice").yields([null, user])

			startServer(app)
			createBrowser()
		}})

		after(function () { with (this) {
			stopServer()
			cleanDatabase()
		}})

		describe("when the password is valid [-login_spec:4-]", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				expect(user, "checkPassword").given("california").returns(true)
			}})

			it("redirects to the chat page [-login_spec:5-]", function () { with (this) {
				visit("/login")
				fillIn("[name=username]", "alice")
				fillIn("[name=password]", "california")
				clickButton("[type=submit]")
				checkPath("/chat")
				checkText(".navigation li:first-child", "Logged in as alice")
			}})
		}})

		describe("when the password is not valid [-login_spec:6-]", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				expect(user, "checkPassword").given("new york").returns(false)
			}})

			it("displays the login page with an error [-login_spec:7-]", function () { with (this) {
				visit("/login")
				fillIn("[name=username]", "alice")
				fillIn("[name=password]", "new york")
				clickButton("[type=submit]")
				checkPath("/login")
				checkText(".error", "Invalid username or password")
			}})
		}})
	}})
}

