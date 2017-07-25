with (JS.Test) {
	describe("Array [-array_spec:0-]", function () { with (this) {
		before(function () { with (this) {
			this.array = ["this", "wooden", "idea"]
		}})

		it("has a length [-array_spec:1-]", function () { with (this) {
			assertEqual( 3, array.length )
		}})

		it("returns the value at an index [-array_spec:2-]", function () { with (this) {
			assertEqual( "wooden", array[1] )
		}})

		it("returns the index of a value [-array_spec:3-]", function () { with (this) {
			assertEqual( 2, array.indexOf("idea") )
		}})
	}})
}

