var JS      = require("jstest"),
    request = require("request")

var ServerSteps = JS.Test.asyncSteps({
  startServer: function(server, callback) {
    this.server = server
    this.server.listen(0, callback)

    this.port   = this.server.address().port
    this.origin = "http://localhost:" + this.port
  },

  stopServer: function(callback) {
    this.server.close(callback)
  },

  get: function(path, params, callback) {
    var url  = this.origin + path,
        self = this

    request.get(url, {qs: params}, function(error, response, body) {
      self.error         = error
      self.response      = response
      self.response.body = body

      callback()
    })
  },

  checkStatus: function(status, callback) {
    this.assertEqual(status, this.response.statusCode)
    callback()
  },

  checkJSON: function(data, callback) {
    var type = this.response.headers["content-type"].split(";")[0]
    this.assertEqual("application/json", type)
    this.assertEqual(data, JSON.parse(this.response.body))
    callback()
  }
})

module.exports = ServerSteps

