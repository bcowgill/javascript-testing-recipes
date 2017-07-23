module.exports = function(request, response) {
  var url = request.user ? "/chat" : "/signup"
  response.redirect(url)
}

