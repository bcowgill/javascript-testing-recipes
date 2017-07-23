var JS     = require("jstest"),
    child  = require("child_process"),
    path   = require("path"),
    concat = require("concat-stream")

var executable = path.join(__dirname, "..", "bin", "add_args")

var execute = function(args, callback) {
  var proc = child.spawn(executable, args)
  proc.stdout.pipe(concat(function(output) {
    callback(output.toString("utf8"))
  }))
}

JS.Test.describe("add_args 2", function() { with(this) {
  it("prints the sum of some floats", function(resume) { with(this) {
    execute(["3.14", "2.72"], function(output) {
      resume(function() { assertEqual( "5.86\n", output ) })
    })
  }})

  it("prints the sum of some rounded floats", function(resume) { with(this) {
    execute(["--round", "3.14", "2.72"], function(output) {
      resume(function() { assertEqual( "6\n", output ) })
    })
  }})
}})

