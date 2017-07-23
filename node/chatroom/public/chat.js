var messageList = $("ul.messages"),
    currentRoom = null,
    lastPoll    = null

$("form.room").on("submit", function(event) {
  event.preventDefault()

  currentRoom = $(this).find("[name=room]").val()
  lastPoll    = Date.now() - 5 * 60 * 1000

  $(".current-room").text(currentRoom)
  messageList.empty()
})

$("form.message").on("submit", function(event) {
  event.preventDefault()
  if (!currentRoom) return

  var form = $(this)

  $.post("/chat/" + currentRoom, form.serialize(), function() {
    form.find("[name=message]").val("")
  })
})

setInterval(function() {
  if (!currentRoom) return

  $.get("/chat/" + currentRoom, {since: lastPoll}, function(response) {
    $.each(response.messages, function(i, chat) {
      var username = chat.username, text = chat.message
      messageList.prepend("<li><b>" + username + ":</b> " + text + "</li>")
      lastPoll = chat.timestamp + 1
    })
  })
}, 1000)

