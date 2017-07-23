var JS = require("jstest")

var normalise = function(headers) {
  var copy = {}
  for (var key in headers) {
    copy[key.toLowerCase()] = headers[key]
  }
  return copy
}

var headerMatcher = function(expected) {
  return {
    equals: function(actual) {
      expected = normalise(expected)
      actual   = normalise(actual)

      for (var key in expected) {
        if (!JS.Enumerable.areEqual(expected[key], actual[key])) {
          return false
        }
      }
      return true
    }
  }
}

module.exports = headerMatcher

