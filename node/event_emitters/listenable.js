var Listenable = function(object) {
  this._object    = object
  this._listeners = []
}

Listenable.prototype.listen = function(listener) {
  this._listeners.push(listener)
}

Listenable.prototype.emit = function() {
  for (var i = 0, n = this._listeners.length; i < n; i++) {
    this._listeners[i].apply(this._object, arguments)
  }
}

module.exports = Listenable

