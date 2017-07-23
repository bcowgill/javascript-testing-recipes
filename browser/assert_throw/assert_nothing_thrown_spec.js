JS.Test.describe("assertNothingThrown", function() { with(this) {
  it("makes sure an error is not thrown", function() { with(this) {
    assertNothingThrown(function() { "spline".toUpperCase() })
  }})
}})

