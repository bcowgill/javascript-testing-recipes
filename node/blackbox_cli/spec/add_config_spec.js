var JS     = require("jstest"),
    child  = require("child_process"),
    fs     = require("fs"),
    path   = require("path"),
    concat = require("concat-stream")

JS.Test.describe("add_config", function() { with(this) {
  before(function() { with(this) {
    this.executable = path.join(__dirname, "..", "bin", "add_config")

    this.env = Object.create(process.env)
    env.ADD_CONFIG_PATH = path.join(__dirname, ".config.json")
  }})

  after(function(resume) { with(this) {
    fs.unlink(env.ADD_CONFIG_PATH, resume)
  }})

  describe("with rounding enabled", function() { with(this) {
    before(function(resume) { with(this) {
      fs.writeFile(env.ADD_CONFIG_PATH, '{"round": true}', resume)
    }})

    it("prints the sum of some rounded floats", function(resume) { with(this) {
      var proc = child.spawn(executable, ["3.14", "2.72"], {env: env})

      proc.stdout.pipe(concat(function(output) {
        var sum = output.toString("utf8")
        resume(function() { assertEqual( "6\n", sum ) })
      }))
    }})
  }})

  describe("with rounding disabled", function() { with(this) {
    before(function(resume) { with(this) {
      fs.writeFile(env.ADD_CONFIG_PATH, '{"round": false}', resume)
    }})

    it("prints the sum of some floats", function(resume) { with(this) {
      var proc = child.spawn(executable, ["3.14", "2.72"], {env: env})

      proc.stdout.pipe(concat(function(output) {
        var sum = output.toString("utf8")
        resume(function() { assertEqual( "5.86\n", sum ) })
      }))
    }})
  }})
}})

