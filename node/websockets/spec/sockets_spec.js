var JS         = require("jstest"),
    events     = require("events"),
    proxyquire = require("proxyquire"),
    json       = require("../../basic_server/json_matcher")

var stubs = {
  "faye-websocket": function() {}
}

JS.Test.describe("Sockets", function() { with(this) {
  before(function() { with(this) {
    this.socket = {}
    stub("new", stubs, "faye-websocket").returns(socket)

    var Sockets  = proxyquire("../lib/sockets", stubs)
    this.service = new events.EventEmitter()
    this.sockets = new Sockets(service)
    this.chat    = {username: "alice", message: "What up"}

    sockets.acceptSocket({headers: {}}, {}, "")
  }})

  it("does not route chats to an unsubscribed socket", function() { with(this) {
    expect(socket, "send").exactly(0)
    service.emit("message", {room: "basement", chat: chat})
  }})

  describe("with a subscribed socket", function() { with(this) {
    before(function() { with(this) {
      socket.onmessage({data: "basement"})
    }})

    it("routes chats to a subscribed socket", function() { with(this) {
      expect(socket, "send").given(json(chat))
      service.emit("message", {room: "basement", chat: chat})
    }})

    it("does not route the chat if the socket changes rooms", function() { with(this) {
      socket.onmessage({data: "kitchen"})
      expect(socket, "send").exactly(0)
      service.emit("message", {room: "basement", chat: chat})
    }})

    it("does not route the chat to a socket subscribed to the wrong room",
    function() { with(this) {
      expect(socket, "send").exactly(0)
      service.emit("message", {room: "kitchen", chat: chat})
    }})

    it("does not route the chat to a closed socket", function() { with(this) {
      socket.onclose()
      expect(socket, "send").exactly(0)
      service.emit("message", {room: "basement", chat: chat})
    }})
  }})
}})

