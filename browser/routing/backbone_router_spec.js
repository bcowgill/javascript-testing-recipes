JS.Test.describe("Router", function() { with(this) {
  before(function() { with(this) {
    this.initialLocation = location.hash
  }})

  after(function() { with(this) {
    Backbone.history.navigate(initialLocation)
  }})

  it("routes / to timeline.html", function() { with(this) {
    expect("render").given("timeline.html")
    Backbone.history.navigate("/home", {trigger: true})
  }})

  it("routes /users/jack to profile.html with username=jack", function() { with(this) {
    expect("render").given("profile.html", {username: "jack"})
    Backbone.history.navigate("/users/jack", {trigger: true})
  }})
}})

