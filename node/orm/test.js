var store = require("./store")
store.configure({host: "127.0.0.1", port: 6379, database: 15})

var JS = require("../../jstest-skip")
require("./validated_user_spec")
require("./persisted_user_spec")
JS.Test.autorun()

