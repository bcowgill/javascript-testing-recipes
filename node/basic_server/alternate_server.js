var http = require("http"),
    url  = require("url")

var server = http.createServer(function(request, response) {
  var query = url.parse(request.url, true).query
  response.statusCode = 200
  response.setHeader("Content-Type", "application/json")
  response.write(JSON.stringify(query, true, 2))
  response.end()
})

module.exports = server

