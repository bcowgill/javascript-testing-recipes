var JS   = require("jstest"),
    User = require("./user")

JS.Test.describe("User (slow) [-user_spec:0-]", function() { with(this) {
  before(function() { with(this) {
    this.user = new User()
  }})

  describe("with no password [-user_spec:1-]", function() { with(this) {
    it("rejects all passwords [-user_spec:2-]", function() { with(this) {
      ["a", "list", "of", "password", "attempts"].forEach(function(pw) {
        assertNot( user.checkPassword(pw) )
      })
    }})
  }})

  describe("with a password [-user_spec:3-]", function() { with(this) {
    before(function() { with(this) {
      user.setPassword("secret")
    }})

    it("accepts the correct password [-user_spec:4-]", function() { with(this) {
      assert( user.checkPassword("secret") )
    }})

    it("rejects incorrect passwords [-user_spec:5-]", function() { with(this) {
      assertNot( user.checkPassword("secre") )
      assertNot( user.checkPassword("secrets") )
      assertNot( user.checkPassword("wrong") )
    }})

    it("rejects a password with the wrong case [-user_spec:6-]", function() { with(this) {
      assertNot( user.checkPassword("SeCrEt") )
    }})
  }})
}})

