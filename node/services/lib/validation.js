module.exports = {
  VALID_NAME:     /^[a-z0-9_]+$/i,

  USERNAME_ERROR: "Usernames may only contain letters, numbers and underscores",
  ROOMNAME_ERROR: "Rooms may only contain letters, numbers and underscores",
  MESSAGE_ERROR:  "Message must not be blank",
  SINCE_ERROR:    "The 'since' parameter must be a valid timestamp",

  checkUser: function(userData) {
    var username = userData.username || "",
        errors   = []

    if (!username.match(this.VALID_NAME)) errors.push(this.USERNAME_ERROR)

    return (errors.length === 0) ? null : errors
  },

  checkMessage: function(messageData) {
    var roomName = messageData.roomName || "",
        message  = messageData.message  || "",
        errors   = []

    if (!roomName.match(this.VALID_NAME)) errors.push(this.ROOMNAME_ERROR)
    if (message.match(/^ *$/)) errors.push(this.MESSAGE_ERROR)

    return (errors.length === 0) ? null : errors
  },

  checkPoll: function(query) {
    var roomName = query.roomName || "",
        since    = query.since,
        errors   = []

    if (!roomName.match(this.VALID_NAME)) errors.push(this.ROOMNAME_ERROR)
    if (typeof since !== "number" || since < Math.pow(10,12)) errors.push(this.SINCE_ERROR)

    return (errors.length === 0) ? null : errors
  }
}

