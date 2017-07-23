JS.Test.describe("validateSignup()", function() { with(this) {
  before(function() { with(this) {
    this.signup = {
      email:    "validname@example.com",
      password: "a-nice-long-safe-password"
    }
  }})

  it("returns no errors for valid data", function() { with(this) {
    assertEqual( {}, validateSignup(signup) )
  }})

  it("returns an error for an invalid email", function() { with(this) {
    signup.email = "not-valid"
    assertEqual( {email: "Email address is not valid"}, validateSignup(signup) )
  }})

  it("returns an error for an short password", function() { with(this) {
    signup.password = "hi"
    assertEqual( {password: "Password is too short"}, validateSignup(signup) )
  }})
}})

