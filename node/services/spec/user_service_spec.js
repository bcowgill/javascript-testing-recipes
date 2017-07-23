var JS          = require("jstest"),
    redis       = require("redis"),
    UserService = require("../lib/user_service")

JS.Test.describe("UserService", function() { with(this) {
  before(function() { with(this) {
    this.db = redis.createClient()
    db.select(15)
    this.service = new UserService(db)
  }})

  after(function(resume) { with(this) {
    db.flushdb(resume)
  }})

  it("registers a new user", function(resume) { with(this) {
    service.register("bob", function(error, created, userData) {
      resume(function() {
        assertNull( error )
        assert( created )
        assertEqual( {id: 1, username: "bob"}, userData )
    })})
  }})

  describe("with an existing user", function() { with(this) {
    before(function(resume) { with(this) {
      service.register("bob", resume)
    }})

    it("assigns sequential IDs", function(resume) { with(this) {
      service.register("alice", function(error, created, userData) {
        resume(function() {
          assertNull( error )
          assert( created )
          assertEqual( {id: 2, username: "alice"}, userData )
      })})
    }})

    it("returns existing users", function(resume) { with(this) {
      service.register("bob", function(error, created, userData) {
        resume(function() {
          assertNull( error )
          assertNot( created )
          assertEqual( {id: 1, username: "bob"}, userData )
      })})
    }})
  }})
}})

