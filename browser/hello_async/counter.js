var Counter = function() {
  this.count = 0
}

Counter.prototype.inc = function(n, callback) {
  var self = this
  var DELAY = 10 //60000
  setTimeout(function() {
    // throw new Error("inc ooooooooooooooooops")
    self.count += n
    callback()
  }, DELAY)
  // throw new Error("inc dddaaaawwwwggg")
}

