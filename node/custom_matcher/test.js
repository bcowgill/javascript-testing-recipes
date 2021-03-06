var JS = JS || require("jstest")

var matchPersonNamed = function (name) {
	return {
		equals: function (value) {
			return (typeof value === "object") && (value.name === name)
		},
		toString: function () {
			return "Person named " + name
		}
	}
}

with (JS.Test) {
	describe("Person [-test:17-]", function () { with(this) {
		it("has a name [-test:18-]", function () { with(this) {
			assertEqual( matchPersonNamed("Bond"), {name: "Bond"} )
		}})
	}})

	autorun()
}

