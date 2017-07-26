var JS     = require("jstest"),
    stream = require("stream"),
    CLI    = require("../lib/cli")

JS.Test.describe("Password CLI [-cli_spec:5-]", function() { with(this) {
  before(function() { with(this) {
    this.ui  = {stdout: {}}
    this.cli = new CLI(ui)
  }})

  describe("when the user enters the right password [-cli_spec:6-]", function() { with(this) {
    before(function() { with(this) {
      stub(ui, "askForPassword").yields(["open sesame!"])
    }})

    it("prints a welcome message [-cli_spec:7-]", function(resume) { with(this) {
      expect(ui.stdout, "write").given("Come on in!\n")
      cli.run(resume)
    }})
  }})

  describe("when the user enters an incorrect password [-cli_spec:8-]", function() { with(this) {
    before(function() { with(this) {
      stub(ui, "askForPassword").yields(["let me in!"])
    }})

    it("yields an error [-cli_spec:9-]", function(resume) { with(this) {
      cli.run(function(error) {
        resume(function() { assertEqual( "ACCESS DENIED", error.message ) })
      })
    }})
  }})
}})

