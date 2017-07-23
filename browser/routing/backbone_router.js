var Router = Backbone.Router.extend({
  routes: {
    "home":            "timeline",
    "users/:username": "profile"
  },

  timeline: function() {
    render("timeline.html")
  },

  profile: function(username) {
    render("profile.html", {username: username})
  }
})

