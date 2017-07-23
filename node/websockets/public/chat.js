var messageList = $("ul.messages"),
    currentRoom = null

$("form.room").on("submit", function(event) {
  event.preventDefault()

  currentRoom = $(this).find("[name=room]").val()

  $(".current-room").text(currentRoom)
  messageList.empty()
  ws.send(currentRoom)
})

$("form.message").on("submit", function(event) {
  event.preventDefault()
  if (!currentRoom) return

  var form = $(this)

  $.post("/chat/" + currentRoom, form.serialize(), function() {
    form.find("[name=message]").val("")
  })
})

var port = SERVER_PORT || location.port,
    host = location.hostname + (port ? ":" + port : ""),
    ws   = new WebSocket("ws://" + host + "/realtime")

ws.onmessage = function(event) {
  var chat     = JSON.parse(event.data),
      username = chat.username,
      text     = chat.message

  messageList.prepend("<li><b>" + username + ":</b> " + text + "</li>")
}

