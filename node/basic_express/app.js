var express = require("express"),
    http    = require("http")

var app = express()

app.get("/", function(request, response) {
  response.json(request.query)
})

module.exports = http.createServer(app)

