var Curry = {
  continuable: function(fn) {
    return function() {
      var args = Array.prototype.slice.call(arguments),
          self = this

      return function(callback) {
        args = args.concat([callback])
        return fn.apply(self, args)
      }
    }
  },

  object: function(object) {
    var copy = {}
    for (var key in object) {
      if (typeof object[key] === "function") {
        copy[key] = this.continuable(object[key])
      } else {
        copy[key] = object[key]
      }
    }
    return copy
  }
}

if (typeof module === "object") {
  module.exports = Curry
}

