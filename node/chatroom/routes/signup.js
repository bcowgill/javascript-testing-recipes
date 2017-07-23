var _    = require("underscore"),
    User = require("../../orm/persisted_user")

module.exports = {
  get: function(request, response) {
    if (request.user) return response.redirect("/chat")
    response.render("signup")
  },

  post: function(request, response) {
    var params = {username: request.body.username, password: request.body.password},
        user   = new User(params)

    user.save(function(errors) {
      if (errors) {
        _.extend(response.locals, {username: params.username, errors: errors})
        response.render("signup")
      } else {
        request.session.userId = user.id
        response.redirect("/chat")
      }
    })
  }
}

