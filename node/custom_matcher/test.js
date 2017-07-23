var JS = require("jstest")

var personNamed = function(name) {
  return {
    equals: function(value) {
      return (typeof value === "object") && (value.name === name)
    },
    toString: function() {
      return "Person named " + name
    }
  }
}

JS.Test.describe("Person", function() { with(this) {
  it("has a name", function() { with(this) {
    assertEqual( personNamed("Bond"), {name: "Bond"} )
  }})
}})

JS.Test.autorun()

