describe("Array [-array_spec:0-]", function() {
  var array

  beforeEach(function() {
    array = ["this", "wooden", "idea"]
  })

  it("has a length [-array_spec:1-]", function() {
    expect(array.length).toBe(3)
  })

  it("returns the value at an index [-array_spec:2-]", function() {
    expect(array[1]).toBe("wooden")
  })

  it("returns the index of a value [-array_spec:3-]", function() {
    expect(array.indexOf("idea")).toBe(2)
  })
})

