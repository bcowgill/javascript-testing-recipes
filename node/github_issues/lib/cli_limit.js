var nopt       = require("nopt"),
    github     = require("./github"),
    presenters = require("./presenters")

var CLI = function(ui) {
  this._argv   = ui.argv
  this._stdout = ui.stdout
}

CLI.prototype.run = function(callback) {
  var params = nopt({limit: Number}, {}, this._argv),
      owner  = params.argv.remain[0],
      repo   = params.argv.remain[1],
      self   = this

  github.getIssues(owner, repo, function(error, issues) {
    if (error) return callback(error)

    if (params.limit) {
      issues = issues.slice(0, params.limit)
    }

    self._stdout.write(issues.length + " open issues:\n\n")
    issues.forEach(function(issue) {
      self._stdout.write(presenters.text(issue) + "\n")
    })
    callback(null)
  })
}

module.exports = CLI

