var store = require("../../orm/store")
store.configure({host: "127.0.0.1", port: 6379, database: 15})

var JS = require("../../../jstest-skip")
require("./signup_spec")
require("./login_spec")
JS.Test.autorun()

