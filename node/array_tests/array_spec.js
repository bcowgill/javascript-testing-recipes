with (JS.Test) {
	describe("Array [-array_spec:0-]", function () { with (this) {
		it("has a length [-array_spec:1-]", function () { with (this) {
			assertEqual( 0, [].length )
			assertEqual( 3, [1, 2, 3].length )
		}})

		it("returns the value at an index [-array_spec:2-]", function () { with (this) {
			assertEqual( undefined, [][0] )
			assertEqual( "b", ["a", "b", "c"][1] )
		}})

		it("returns the index of a value [-array_spec:3-]", function () { with (this) {
			assertEqual( -1, [].indexOf("thing") )
			assertEqual( 2, ["this", "wooden", "idea"].indexOf("idea") )
		}})
	}})
}
