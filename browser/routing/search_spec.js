with (JS.Test) {
	describe("search() [-search_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			stub($, "get").given("/search", {q: "mogwai"}).yields([{url: "/artists/70202-mogwai"}])
		}})

		it("redirects to the given URL [-search_spec:1-]", function () { with (this) {
			expect("redirect").given("/artists/70202-mogwai")
			search("mogwai")
		}})
	}})
}
