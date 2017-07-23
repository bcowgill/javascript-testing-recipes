var Counter = function() {
  this.count = 0
}

Counter.prototype.inc = function(n, callback) {
  var self = this
  setTimeout(function() {
    self.count += n
    callback()
  }, 10)
}

