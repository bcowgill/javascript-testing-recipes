var JS   = require("jstest"),
    json = require("./json_matcher")

JS.Test.describe("json()", function() { with(this) {
  before(function() { with(this) {
    this.matcher = json({numbers: [1, 2, 3]})
  }})

  it("matches a JSON representation of the object", function() { with(this) {
    assertEqual( matcher, '{"numbers":[1,2,3]}' )
  }})

  it("matches a valid JSON representation with whitespace", function() { with(this) {
    assertEqual( matcher, '{\n  "numbers": [1, 2, 3]\n}' )
  }})

  it("does not match invalid JSON", function() { with(this) {
    assertNotEqual( matcher, '{"numbers":[1,2,3}' )
  }})

  it("does not match JSON that does not represent the data", function() { with(this) {
    assertNotEqual( matcher, '{"numbers":[1,9,3]}' )
  }})
}})

