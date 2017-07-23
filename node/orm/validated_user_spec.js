var JS            = require("jstest"),
    ValidatedUser = require("./validated_user")

JS.Test.describe("ValidatedUser", function() { with(this) {
  before(function() { with(this) {
    this.user = new ValidatedUser({username: "alice", password: "fish", workFactor: 1})
  }})

  it("returns no errors for a valid user", function() { with(this) {
    assertNull( user.validate() )
  }})

  it("returns an error for a short username", function() { with(this) {
    user.set("username", "n")
    assertEqual( ["Usernames must have at least 2 characters"], user.validate() )
  }})

  it("returns an error for an invalid username", function() { with(this) {
    user.set("username", "$%^&")
    assertEqual( ["Usernames may only contain letters, numbers and underscores"],
                 user.validate() )
  }})

  it("returns an error for a blank password", function() { with(this) {
    var user = new ValidatedUser({username: "alice"})
    assertEqual( ["Password must not be blank"], user.validate() )
  }})
}})

