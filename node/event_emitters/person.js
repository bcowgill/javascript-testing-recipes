var Listenable = require("./listenable"),
    util       = require("util")

var Person = function(attributes) {
  this.change            = new Listenable(this)
  this.change.name       = new Listenable(this)
  this.change.occupation = new Listenable(this)

  this._attributes = attributes
}

Person.prototype.set = function(attributes) {
  var changed = false
  for (var key in attributes) {
    if (this._attributes[key] === attributes[key]) {
      continue
    }
    this._attributes[key] = attributes[key]
    this.change[key].emit(attributes[key])
    changed = true
  }
  if (changed) this.change.emit()
}

module.exports = Person

