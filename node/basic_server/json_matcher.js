var JS = require("jstest")

var jsonMatcher = function(data) {
  return {
    equals: function(string) {
      try {
        var parsed = JSON.parse(string)
        return JS.Enumerable.areEqual(data, parsed)
      } catch (e) {
        return false
      }
    }
  }
}

module.exports = jsonMatcher

