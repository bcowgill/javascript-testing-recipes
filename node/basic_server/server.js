var http = require("http"),
    url  = require("url")

var server = http.createServer(function(request, response) {
  var query = url.parse(request.url, true).query
  response.writeHead(200, {"Content-Type": "application/json"})
  response.end(JSON.stringify(query, true, 2))
})

module.exports = server

