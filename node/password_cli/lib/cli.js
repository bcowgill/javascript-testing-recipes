var CLI = function(ui) {
  this._ui = ui
}

CLI.prototype.run = function(callback) {
  var self = this

  this._ui.askForPassword(function(password) {
    if (password === "open sesame!") {
      self._ui.stdout.write("Come on in!\n")
      callback(null)
    } else {
      callback(new Error("ACCESS DENIED"))
    }
  })
}

module.exports = CLI

