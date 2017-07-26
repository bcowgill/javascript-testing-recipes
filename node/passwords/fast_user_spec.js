var JS   = require("jstest"),
    User = require("./user")

JS.Test.describe("User (fast) [-fast_user_spec:0-]", function() { with(this) {
  before(function() { with(this) {
    stub(User, "WORK_FACTOR", 1)
    this.user = new User()
  }})

  describe("with no password [-fast_user_spec:1-]", function() { with(this) {
    it("rejects all passwords [-fast_user_spec:2-]", function() { with(this) {
      ["a", "list", "of", "password", "attempts"].forEach(function(pw) {
        assertNot( user.checkPassword(pw) )
      })
    }})
  }})

  describe("with a password [-fast_user_spec:3-]", function() { with(this) {
    before(function() { with(this) {
      user.setPassword("secret")
    }})

    it("accepts the correct password [-fast_user_spec:4-]", function() { with(this) {
      assert( user.checkPassword("secret") )
    }})

    it("rejects incorrect passwords [-fast_user_spec:5-]", function() { with(this) {
      assertNot( user.checkPassword("secre") )
      assertNot( user.checkPassword("secrets") )
      assertNot( user.checkPassword("wrong") )
    }})

    it("rejects a password with the wrong case [-fast_user_spec:6-]", function() { with(this) {
      assertNot( user.checkPassword("SeCrEt") )
    }})
  }})
}})

