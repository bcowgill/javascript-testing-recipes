var redis = require("redis"),
    app   = require("./app"),
    env   = process.env

var validation  = require("./lib/validation"),
    UserService = require("./lib/user_service"),
    ChatService = require("./lib/chat_service")

var db = redis.createClient(env.REDIS_PORT, env.REDIS_HOST)
db.select(env.REDIS_DB || 0)

var users = new UserService(db),
    chats = new ChatService(db)

var server = app(validation, users, chats)
server.listen(env.SERVER_PORT)

