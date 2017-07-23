var JS        = require("jstest"),
    async     = require("async"),
    WebSocket = require("faye-websocket").Client,
    Browser   = require("../../chatroom/spec/browser"),
    store     = require("../../orm/store"),
    User      = require("../../orm/persisted_user"),
    app       = require("../app")

JS.Test.describe("WebSockets", function() { with(this) {
  before(function(resume) { with(this) {
    var user = new User({username: "james", password: "x", workFactor: 1}),
        self = this

    user.save(function() {
      self.server = app.listen(0, function() {
        var port     = server.address().port
        self.browser = new Browser("Mozilla/5.0", "http://localhost:" + port)

        self.ws      = new WebSocket("ws://localhost:" + port + "/realtime")
        self.message = null
        ws.onmessage = function(message) { self.message = message }
        ws.onopen    = function() { resume() }
      })
    })
  }})
  
  after(function(resume) { with(this) {
    async.series([
      function(cb) { ws.onclose = function() { cb() } ; ws.close() },
      function(cb) { server.close(cb) },
      function(cb) { store.getConnection().flushdb(cb) }
    ], resume)
  }})

  it("echoes published messages to a subscribed WebSocket", function(resume) { with(this) {
    ws.send("library")

    async.series([
      function(cb) {
        browser.visit("/login", cb)
      }, function(cb) {
        browser.dom("[name=username]").val("james")
        browser.dom("[name=password]").val("x")
        browser.submitForm(browser.dom("form"), cb)
      }, function(cb) {
        var form = browser.dom("form.message")
        form.attr("action", "/chat/library")
        form.find("[name=message]").val("Shh, people are reading!")
        browser.submitForm(form, cb)
      }
    ], function() {
      resume(function() {
        assertEqual( {
          id:        1,
          timestamp: instanceOf("number"),
          username:  "james",
          message:   "Shh, people are reading!"
        }, JSON.parse(message.data) )
      })
    })
  }})
}})

