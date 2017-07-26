var JS            = require("jstest"),
    ValidatedUser = require("./validated_user")

JS.Test.describe("ValidatedUser [-validated_user_spec:0-]", function() { with(this) {
  before(function() { with(this) {
    this.user = new ValidatedUser({username: "alice", password: "fish", workFactor: 1})
  }})

  it("returns no errors for a valid user [-validated_user_spec:1-]", function() { with(this) {
    assertNull( user.validate() )
  }})

  it("returns an error for a short username [-validated_user_spec:2-]", function() { with(this) {
    user.set("username", "n")
    assertEqual( ["Usernames must have at least 2 characters"], user.validate() )
  }})

  it("returns an error for an invalid username [-validated_user_spec:3-]", function() { with(this) {
    user.set("username", "$%^&")
    assertEqual( ["Usernames may only contain letters, numbers and underscores"],
                 user.validate() )
  }})

  it("returns an error for a blank password [-validated_user_spec:4-]", function() { with(this) {
    var user = new ValidatedUser({username: "alice"})
    assertEqual( ["Password must not be blank"], user.validate() )
  }})
}})

