var express = require("express"),
    app     = express(),
    storage = {}

app.use(express.urlencoded())

app.get("/:key", function(request, response) {
  var key = request.params.key
  if (storage.hasOwnProperty(key)) {
    response.send(200, storage[key])
  } else {
    response.send(404, "Not found")
  }
})

app.put("/:key", function(request, response) {
  storage[request.params.key] = request.body.value
  response.send(201, "Created")
})

app.delete("/", function(request, response) {
  storage = {}
  response.send(200, "OK")
})

module.exports = app

