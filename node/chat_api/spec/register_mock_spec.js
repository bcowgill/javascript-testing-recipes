var JS       = require("jstest"),
	register = require("../routes/register")

with (JS.Test) {
	describe("register() [-register_mock_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.request  = {body: {username: "alice"}}
			this.response = {}
			this.redis    = {}
			this.userData = {id: 33, username: "alice"}
		}})

		after(function (resume) { with (this) {
			register(request, response, redis)
			setTimeout(resume, 10)
		}})

		describe("with an invalid username [-register_mock_spec:1-]", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				request.body.username = ""
			}})

			it("returns a 409 Conflict response [-register_mock_spec:2-]", function () { with (this) {
				expect(response, "json").given(409, {
					errors: ["Usernames may only contain letters, numbers and underscores"]
				})
			}})
		}})

		describe("when the username does not already exist [-register_mock_spec:3-]", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				stub(redis, "sadd").given("users", "alice").yields([null, 1])
			}})

			it("adds the user to the database [-register_mock_spec:4-]", function () { with (this) {
				expect(redis, "incr").given("counters:user").yields([null, 33])
				expect(redis, "hmset").given("users:33", userData).yields([null, "OK"])
				expect(redis, "set").given("index:users:alice", 33).yields([null, "OK"])

				expect(response, "json").given(201, userData)
			}})
		}})

		describe("when the username exists [-register_mock_spec:5-]", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				stub(redis, "sadd").given("users", "alice").yields([null, 0])
			}})

			it("returns the existing user [-register_mock_spec:6-]", function () { with (this) {
				expect(redis, "get").given("index:users:alice").yields([null, "33"])
				expect(redis, "hgetall").given("users:33").yields([null, userData])

				expect(response, "json").given(200, userData)
			}})
		}})
	}})
}

