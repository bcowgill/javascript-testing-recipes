#!/usr/bin/env node

var http = require("http")

var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"})
  response.end("Hello, Node World\n")
})

server.listen(1337)
