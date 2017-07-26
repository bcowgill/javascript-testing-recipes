with (JS.Test) {
	describe("Router [-backbone_router_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.initialLocation = location.hash
		}})

		after(function () { with (this) {
			Backbone.history.navigate(initialLocation)
		}})

		it("routes / to timeline.html [-backbone_router_spec:1-]", function () { with (this) {
			expect("render").given("timeline.html")
			Backbone.history.navigate("/home", {trigger: true})
		}})

		it("routes /users/jack to profile.html with username=jack [-backbone_router_spec:2-]", function () { with (this) {
			expect("render").given("profile.html", {username: "jack"})
			Backbone.history.navigate("/users/jack", {trigger: true})
		}})
	}})
}
