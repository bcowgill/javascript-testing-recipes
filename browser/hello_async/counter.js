var Counter = function() {
  this.count = 0
}

Counter.prototype.inc = function(n, callback) {
  var self = this
  setTimeout(function() {
    // throw new Error("inc ooooooooooooooooops")
    self.count += n
    callback()
  }, 10)
  // throw new Error("inc dddaaaawwwwggg")
}

