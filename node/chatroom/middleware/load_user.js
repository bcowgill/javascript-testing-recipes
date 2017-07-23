var User = require("../../orm/persisted_user")

module.exports = function(request, response, next) {
  response.locals.csrf = request.csrfToken()

  var userId = request.session.userId
  if (userId === undefined) return next()

  User.findById(userId, function(error, user) {
    if (error) delete request.session.userId
    request.user = response.locals.user = user
    next()
  })
}

