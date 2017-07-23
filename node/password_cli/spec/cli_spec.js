var JS     = require("jstest"),
    stream = require("stream"),
    CLI    = require("../lib/cli")

JS.Test.describe("Password CLI", function() { with(this) {
  before(function() { with(this) {
    this.ui  = {stdout: {}}
    this.cli = new CLI(ui)
  }})

  describe("when the user enters the right password", function() { with(this) {
    before(function() { with(this) {
      stub(ui, "askForPassword").yields(["open sesame!"])
    }})

    it("prints a welcome message", function(resume) { with(this) {
      expect(ui.stdout, "write").given("Come on in!\n")
      cli.run(resume)
    }})
  }})

  describe("when the user enters an incorrect password", function() { with(this) {
    before(function() { with(this) {
      stub(ui, "askForPassword").yields(["let me in!"])
    }})

    it("yields an error", function(resume) { with(this) {
      cli.run(function(error) {
        resume(function() { assertEqual( "ACCESS DENIED", error.message ) })
      })
    }})
  }})
}})

