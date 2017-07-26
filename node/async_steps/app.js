var express = require("express"),
    app     = express(),
    storage = {}

app.use(express.urlencoded())

app.get("/:key", function(request, response) {
  var key = request.params.key
  if (storage.hasOwnProperty(key)) {
    response.send(200, storage[key] + '\n')
  } else {
    response.send(404, "Not found\n")
  }
})

app.put("/:key", function(request, response) {
  storage[request.params.key] = request.body.value
  response.send(201, "Created\n")
})

app.delete("/:key", function(request, response) {
  delete storage[request.params.key]
  response.send(201, "OK\n")
})

app.delete("/", function(request, response) {
  storage = {}
  response.send(200, "OK\n")
})

app.get("/", function(request, response) {
  response.send(200, Object.keys(storage).join("\n") + "\n")
})

module.exports = app

