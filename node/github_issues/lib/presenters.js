var Presenters = {
  text: function(issue) {
    var date = new Date(issue.created_at).toGMTString()

    return "#" + issue.number + ": " + issue.title + "\n" +
           issue.html_url + "\n" +
           "[" + issue.user.login + "] " + date + "\n"
  }
}

module.exports = Presenters

