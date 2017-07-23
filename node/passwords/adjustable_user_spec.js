var JS   = require("jstest"),
    User = require("./adjustable_user")

JS.Test.describe("AdjustableUser", function() { with(this) {
  before(function() { with(this) {
    this.user = new User({workFactor: 1})
    user.setPassword("secret")
  }})

  it("accepts the correct password", function() { with(this) {
    assert( user.checkPassword("secret") )
  }})

  it("rejects incorrect passwords", function() { with(this) {
    assertNot( user.checkPassword("secre") )
    assertNot( user.checkPassword("secrets") )
    assertNot( user.checkPassword("wrong") )
  }})

  it("rejects a password with the wrong case", function() { with(this) {
    assertNot( user.checkPassword("SeCrEt") )
  }})
}})

