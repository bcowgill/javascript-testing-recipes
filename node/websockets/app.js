var express     = require("express"),
    http        = require("http"),
    path        = require("path"),
    store       = require("../orm/store"),
    loadUser    = require("../chatroom/middleware/load_user"),
    home        = require("../chatroom/routes/home"),
    signup      = require("../chatroom/routes/signup"),
    sessions    = require("../chatroom/routes/sessions"),
    Chats       = require("../chatroom/routes/chats"),
    ChatService = require("./lib/evented_chat_service"),
    Sockets     = require("./lib/sockets")

var service = new ChatService(store.getConnection()),
    chats   = new Chats(service),
    sockets = new Sockets(service),
    app     = express()

app.set("views", path.resolve(__dirname, "..", "chatroom", "views"))
app.set("view engine", "jade")

app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.urlencoded())
app.use(express.cookieParser())
app.use(express.session({secret: "4855bca1b9a0ae6d5752a2ee7f2b162f66219b23"}))
app.use(express.csrf())
app.use(loadUser)

app.get("/",                home)

app.get("/signup",          signup.get)
app.post("/signup",         signup.post)

app.get("/login",           sessions.getLogin)
app.post("/login",          sessions.postLogin)
app.get("/logout",          sessions.logout)

app.get("/chat",            chats.get.bind(chats))
app.post("/chat/:roomName", chats.post.bind(chats))
app.get("/chat/:roomName",  chats.poll.bind(chats))

var server = http.createServer(app)
server.on("upgrade", sockets.acceptSocket.bind(sockets))

module.exports = server

