var Listenable = function (object) {
	this._object    = object
	this._listeners = []
}

Listenable.prototype.numListening = function () {
	this._listeners.length
}

Listenable.prototype.listenToEvent = function (listener) {
	this._listeners.push(listener)
}

Listenable.prototype.ignoreEvent = function (listener) {
	var idx = this._listeners.indexOf(listener)
	if (idx >= 0) {
		this._listeners.splice(idx, 1)
	}
}

Listenable.prototype.emit = function () {
	for (var i = 0, n = this._listeners.length; i < n; i++) {
		this._listeners[i].apply(this._object, arguments)
	}
}

module.exports = Listenable

