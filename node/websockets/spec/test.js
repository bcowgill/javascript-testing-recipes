var store = require("../../orm/store")
store.configure({host: "127.0.0.1", port: 6379, database: 15})

var JS = require("jstest")
require("./evented_chat_service_spec")
require("./sockets_spec")
require("./sockets_server_spec")
require("./websocket_spec")
JS.Test.autorun()

