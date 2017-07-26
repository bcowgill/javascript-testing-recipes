with (JS.Test) {
	describe("route() [-router_spec:0-]", function () { with (this) { addSkip(this)
		it("routes / to timeline.html [-router_spec:1-]", function () { with (this) {
			expect("render").given("timeline.html")
			route({pathname: "/"})
		}})

		it("routes /users/jack to profile.html with username=jack [-router_spec:2-]", function () { with (this) {
			expect("render").given("profile.html", {username: "jack"})
			route({pathname: "/users/jack"})
		}})
	}})
}
