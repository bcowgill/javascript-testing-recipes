var JS       = require("jstest"),
    register = require("../routes/register")

JS.Test.describe("register() errors [-redis_error_spec:0-]", function() { with(this) {
  before(function() { with(this) {
    this.request  = {body: {username: "alice"}}
    this.response = {}
    this.redis    = {}

    stub(redis, "sadd").yields([new Error("E_ACCESSDENIED")])
  }})

  it("returns a 500 Internal Server Error response [-redis_error_spec:1-]", function(resume) { with(this) {
    expect(response, "json").given(500, {errors: ["E_ACCESSDENIED"]})

    register(request, response, redis)
    setTimeout(resume, 10)
  }})
}})

