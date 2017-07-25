with (JS.Test) {
	describe("Array [-array_spec:4-]", function () { with (this) {
		it("has a length [-array_spec:5-]", function () { with (this) {
			assertEqual( 0, [].length )
			assertEqual( 3, [1, 2, 3].length )
		}})

		it("returns the value at an index [-array_spec:6-]", function () { with (this) {
			assertEqual( undefined, [][0] )
			assertEqual( "b", ["a", "b", "c"][1] )
		}})

		it("returns the index of a value [-array_spec:7-]", function () { with (this) {
			assertEqual( -1, [].indexOf("thing") )
			assertEqual( 2, ["this", "wooden", "idea"].indexOf("idea") )
		}})
	}})
}
