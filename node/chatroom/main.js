var store = require("../orm/store"),
    env   = process.env

store.configure({host: env.REDIS_HOST, port: env.REDIS_PORT, database: env.REDIS_DB})

var app = require("./app")
app.listen(env.SERVER_PORT)

