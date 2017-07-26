var request = require("request"),
    app     = require("./app")

var ServerSteps = {
  startServer: function(port, callback) {
    this.host   = "http://localhost:" + port
    this.server = app.listen(port, callback)
  },

  stopServer: function(callback) {
    this.server.close(callback)
  },

  clearData: function(callback) {
    request.del(this.host + "/", callback)
  },

  get: function(path, callback) {
    var self = this
    request(this.host + path, function(error, response, body) {
      self.response = response
      self.response.body = body
      if (error) {
        // what to do if error? throw, callback with error?
        console.error('error from server', error)
      }
      callback(error)
    })
  },

  put: function(path, params, callback) {
    request.put(this.host + path, {form: params}, callback)
  },

  checkBody: function(body, callback) {
    this.assertEqual(body, this.response.body)
    callback()
  }
}

module.exports = ServerSteps

