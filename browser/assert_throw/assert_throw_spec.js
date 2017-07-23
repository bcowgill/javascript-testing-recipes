JS.Test.describe("assertThrow", function() { with(this) {
  it("makes sure an error is thrown", function() { with(this) {
    assertThrow(TypeError, function() { "spline".reticulate() })
  }})
}})

