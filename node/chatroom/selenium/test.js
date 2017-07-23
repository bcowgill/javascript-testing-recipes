var testium = require("testium"),
    path    = require("path"),
    store   = require("../../orm/store")

store.configure({host: "127.0.0.1", port: 6379, database: 15})

var options = {
  tests:   path.resolve(__dirname, "*_spec.js"),
  browser: process.env.BROWSER || "firefox"
}

var server = require("../app").listen(0, function() {
  options.applicationPort = server.address().port

  testium.run(options, function(error, status) {
    process.exit(status)
  })
})

