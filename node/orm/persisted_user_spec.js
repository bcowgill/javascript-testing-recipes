var JS            = require("jstest"),
	store         = require("./store"),
	PersistedUser = require("./persisted_user")

with (JS.Test) {
	describe("PersistedUser [-persisted_user_spec:0-]", function () { with (this) { addSkip(this)
		before(function (resume) { with (this) {
			this.alice = new PersistedUser({username: "alice", password: "fish", workFactor: 1})
			alice.save(resume)
		}})

		after(function (resume) { with (this) {
			store.getConnection().flushdb(resume)
		}})

		it("saves a user with a new username [-persisted_user_spec:1-]", function (resume) { with (this) {
			var bob = new PersistedUser({username: "bob", password: "chips", workFactor: 1})
			bob.save(function () {
				PersistedUser.findByUsername("bob", function (error, user) {
					resume(function () {
						assertNull( error )
						assertEqual( "bob", user.get("username") )
			})})})
		}})

		it("does not save a new user with an existing username [-persisted_user_spec:2-]", function (resume) { with (this) {
			var aliceCopy = new PersistedUser({username: "alice", password: "chips", workFactor: 1})
			aliceCopy.save(function (error) {
				resume(function (resume) {
					assertEqual( ["Username already exists"], error )
					PersistedUser.findByUsername("alice", function (error, user) {
						resume(function () {
							assert( user.checkPassword("fish") )
			})})})})
		}})

		it("saves updates to an existing user [-persisted_user_spec:3-]", function (resume) { with (this) {
			alice.set("email", "alice@example.com")
			alice.save(function () {
				PersistedUser.findByUsername("alice", function (error, user) {
					resume(function () {
						assertNull( error )
						assertEqual( "alice@example.com", user.get("email") )
			})})})
		}})
	}})
}

