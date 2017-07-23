var User = require("../../orm/persisted_user")

module.exports = {
  getLogin: function(request, response) {
    if (request.user) return response.redirect("/chat")
    response.render("login")
  },

  postLogin: function(request, response) {
    var username = request.body.username,
        password = request.body.password

    User.findByUsername(username, function(error, user) {
      if (user && user.checkPassword(password)) {
        request.session.userId = user.id
        response.redirect("/chat")
      } else {
        response.locals.username = username
        response.locals.error = "Invalid username or password"
        response.render("login")
      }
    })
  },

  logout: function(request, response) {
    delete request.session.userId
    response.redirect("/")
  }
}

