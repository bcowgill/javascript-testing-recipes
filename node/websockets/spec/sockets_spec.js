var JS         = require("jstest"),
    events     = require("events"),
    proxyquire = require("proxyquire"),
    json       = require("../../basic_server/json_matcher")

var stubs = {
  "faye-websocket": function() {}
}

JS.Test.describe("Sockets [-sockets_spec:0-]", function() { with(this) {
  before(function() { with(this) {
    this.socket = {}
    stub("new", stubs, "faye-websocket").returns(socket)

    var Sockets  = proxyquire("../lib/sockets", stubs)
    this.service = new events.EventEmitter()
    this.sockets = new Sockets(service)
    this.chat    = {username: "alice", message: "What up"}

    sockets.acceptSocket({headers: {}}, {}, "")
  }})

  it("does not route chats to an unsubscribed socket [-sockets_spec:1-]", function() { with(this) {
    expect(socket, "send").exactly(0)
    service.emit("message", {room: "basement", chat: chat})
  }})

  describe("with a subscribed socket [-sockets_spec:2-]", function() { with(this) {
    before(function() { with(this) {
      socket.onmessage({data: "basement"})
    }})

    it("routes chats to a subscribed socket [-sockets_spec:3-]", function() { with(this) {
      expect(socket, "send").given(json(chat))
      service.emit("message", {room: "basement", chat: chat})
    }})

    it("does not route the chat if the socket changes rooms [-sockets_spec:4-]", function() { with(this) {
      socket.onmessage({data: "kitchen"})
      expect(socket, "send").exactly(0)
      service.emit("message", {room: "basement", chat: chat})
    }})

    it("does not route the chat to a socket subscribed to the wrong room [-sockets_spec:5-]",
    function() { with(this) {
      expect(socket, "send").exactly(0)
      service.emit("message", {room: "kitchen", chat: chat})
    }})

    it("does not route the chat to a closed socket [-sockets_spec:6-]", function() { with(this) {
      socket.onclose()
      expect(socket, "send").exactly(0)
      service.emit("message", {room: "basement", chat: chat})
    }})
  }})
}})

