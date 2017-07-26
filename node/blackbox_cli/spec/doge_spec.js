var JS    = require("jstest"),
    child = require("child_process"),
    path  = require("path")

JS.Test.describe("doge [-doge_spec:0-]", function() { with(this) {
  before(function() { with(this) {
    this.executable = path.join(__dirname, "..", "bin", "doge")
    this.proc       = child.spawn(executable)
    this.output     = null
  }})

  it("rewards a good doge [-doge_spec:1-]", function(resume) { with(this) {
    proc.stdout.on("data", function(chunk) {
      output = chunk.toString("utf8")
    })
    proc.stderr.on("data", function(chunk) {
      proc.stdin.write("such question, wow\n")
    })
    proc.on("exit", function(status) {
      resume(function() {
        assertEqual( "Good doge!\n", output )
        assertEqual( 0, status )
      })
    })
  }})

  it("punishes a bad doge [-doge_spec:2-]", function(resume) { with(this) {
    proc.stderr.on("data", function(chunk) {
      var response = chunk.toString("utf8")
      if (response === "Who's a good doge? ") {
        proc.stdin.write("WOOF!\n")
      } else {
        output = response
      }
    })
    proc.on("exit", function(status) {
      resume(function() {
        assertEqual( "Nope\n", output )
        assertEqual( 1, status )
      })
    })
  }})
}})

