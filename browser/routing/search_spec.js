with (JS.Test) {
	describe("search()", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			stub($, "get").given("/search", {q: "mogwai"}).yields([{url: "/artists/70202-mogwai"}])
		}})

		it("redirects to the given URL", function () { with (this) {
			expect("redirect").given("/artists/70202-mogwai")
			search("mogwai")
		}})
	}})
}
