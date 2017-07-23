describe("Array", function() {
  var array

  beforeEach(function() {
    array = ["this", "wooden", "idea"]
  })

  it("has a length", function() {
    expect(array.length).toBe(3)
  })

  it("returns the value at an index", function() {
    expect(array[1]).toBe("wooden")
  })

  it("returns the index of a value", function() {
    expect(array.indexOf("idea")).toBe(2)
  })
})

