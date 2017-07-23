JS.Test.describe("Array", function() { with(this) {
  before(function() { with(this) {
    this.array = ["this", "wooden", "idea"]
  }})

  it("has a length", function() { with(this) {
    assertEqual( 3, array.length )
  }})

  it("returns the value at an index", function() { with(this) {
    assertEqual( "wooden", array[1] )
  }})

  it("returns the index of a value", function() { with(this) {
    assertEqual( 2, array.indexOf("idea") )
  }})
}})

