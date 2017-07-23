var JS   = require("jstest"),
    User = require("./user")

JS.Test.describe("User (fast)", function() { with(this) {
  before(function() { with(this) {
    stub(User, "WORK_FACTOR", 1)
    this.user = new User()
  }})

  describe("with no password", function() { with(this) {
    it("rejects all passwords", function() { with(this) {
      ["a", "list", "of", "password", "attempts"].forEach(function(pw) {
        assertNot( user.checkPassword(pw) )
      })
    }})
  }})

  describe("with a password", function() { with(this) {
    before(function() { with(this) {
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
}})

