var JS     = require("jstest"),
    child  = require("child_process"),
    path   = require("path"),
    concat = require("concat-stream")

JS.Test.describe("add_env", function() { with(this) {
  before(function() { with(this) {
    this.executable = path.join(__dirname, "..", "bin", "add_env")
  }})

  it("prints the sum of some rounded floats", function(resume) { with(this) {
    var env = Object.create(process.env)
    env.ROUND = "1"

    var proc = child.spawn(executable, ["3.14", "2.72"], {env: env})

    proc.stdout.pipe(concat(function(output) {
      var sum = output.toString("utf8")
      resume(function() { assertEqual( "6\n", sum ) })
    }))
  }})
}})

