with (JS.Test) {
	describe("route()", function () { with (this) { addSkip(this)
		it("routes / to timeline.html", function () { with (this) {
			expect("render").given("timeline.html")
			route({pathname: "/"})
		}})

		it("routes /users/jack to profile.html with username=jack", function () { with (this) {
			expect("render").given("profile.html", {username: "jack"})
			route({pathname: "/users/jack"})
		}})
	}})
}
