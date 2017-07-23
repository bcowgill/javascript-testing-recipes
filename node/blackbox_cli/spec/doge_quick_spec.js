var JS     = require("jstest"),
    child  = require("child_process"),
    path   = require("path"),
    concat = require("concat-stream")

JS.Test.describe("doge", function() { with(this) {
  before(function() { with(this) {
    this.executable = path.join(__dirname, "..", "bin", "doge")
    this.proc       = child.spawn(executable)
  }})

  it("rewards a good doge", function(resume) { with(this) {
    proc.stdin.write("such question, wow\n")

    proc.stdout.pipe(concat(function(output) {
      output = output.toString("utf8")
      resume(function() { assertEqual( "Good doge!\n", output ) })
    }))
  }})

  it("punishes a bad doge", function(resume) { with(this) {
    proc.stdin.write("WOOF!\n")

    proc.stderr.pipe(concat(function(output) {
      output = output.toString("utf8")
      resume(function() {
        assertEqual( "Who's a good doge? Nope\n", output )
      })
    }))
  }})
}})

