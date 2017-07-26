var JS        = require("jstest"),
    events    = require("events"),
    http      = require("http"),
    WebSocket = require("faye-websocket").Client,
    Sockets   = require("../lib/sockets")

JS.Test.describe("Socket server [-sockets_server_spec:0-]", function() { with(this) {
  before(function(resume) { with(this) {
    this.service = new events.EventEmitter()
    this.sockets = new Sockets(service)
    this.ws      = null
    this.message = null
    this.chat    = {username: "alice", message: "What up"}

    this.server  = http.createServer()
    server.on("upgrade", sockets.acceptSocket.bind(sockets))

    server.listen(0, function() {
      ws           = new WebSocket("ws://localhost:" + server.address().port + "/realtime")
      ws.onmessage = function(m) { message = m }
      ws.onopen    = function()  { resume() }
    })
  }})

  after(function(resume) { with(this) {
    ws.onclose = function() {
      server.close(resume)
    }
    ws.close()
  }})

  it("routes chats to a subscribed socket [-sockets_server_spec:1-]", function(resume) { with(this) {
    ws.send("basement")

    setTimeout(function() {
      service.emit("message", {room: "basement", chat: chat})

      setTimeout(function() {
        resume(function() {
          assertEqual( {username: "alice", message: "What up"}, JSON.parse(message.data) )
        })
      }, 10)
    }, 10)
  }})

  it("does not route chats to an unsubscribed socket [-sockets_server_spec:2-]", function(resume) { with(this) {
    service.emit("message", {room: "basement", chat: chat})

    setTimeout(function() {
      resume(function() { assertNull( message ) })
    }, 10)
  }})
}})

