var Ticker = function(selector, messages) {
  this._element  = $(selector)
  this._messages = messages
  this._index    = 0

  var self = this
  this._timer = setInterval(function() { self.update() }, 1000)
}

Ticker.prototype.update = function() {
  if (this._index === this._messages.length) return this.stop()

  this._element.append("<li>" + this._messages[this._index] + "</li>")
  this._index += 1
}

Ticker.prototype.stop = function() {
  clearInterval(this._timer)
  delete this._timer
}

