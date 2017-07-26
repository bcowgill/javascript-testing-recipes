var JS     = require("jstest"),
    child  = require("child_process"),
    path   = require("path"),
    concat = require("concat-stream")

JS.Test.describe("add [-add_spec:0-]", function() { with(this) {
  before(function() { with(this) {
    this.executable = path.join(__dirname, "..", "bin", "add")
  }})

  it("prints the sum of some integers [-add_spec:1-]", function(resume) { with(this) {
    var proc = child.spawn(executable, ["1", "2", "3"])

    proc.stdout.pipe(concat(function(output) {
      var sum = output.toString("utf8")
      resume(function() { assertEqual( "6\n", sum ) })
    }))
  }})

  it("prints the sum of some floats [-add_spec:2-]", function(resume) { with(this) {
    var proc = child.spawn(executable, ["3.14", "2.72"])

    proc.stdout.pipe(concat(function(output) {
      var sum = output.toString("utf8")
      resume(function() { assertEqual( "5.86\n", sum ) })
    }))
  }})
}})

