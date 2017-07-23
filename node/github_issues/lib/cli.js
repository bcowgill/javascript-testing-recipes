var github     = require("./github"),
    presenters = require("./presenters")

var CLI = function(ui) {
  this._argv   = ui.argv
  this._stdout = ui.stdout
}

CLI.prototype.run = function(callback) {
  var owner = this._argv[2],
      repo  = this._argv[3],
      self  = this

  github.getIssues(owner, repo, function(error, issues) {
    if (error) return callback(error)
    self._stdout.write(issues.length + " open issues:\n\n")
    issues.forEach(function(issue) {
      self._stdout.write(presenters.text(issue) + "\n")
    })
    callback(null)
  })
}

module.exports = CLI

