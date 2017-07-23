var route = function() {
  var match
  if (location.pathname === "/") {
    render("timeline.html")
  } else if (match = location.pathname.match(/^\/users\/([a-z]+)$/)) {
    render("profile.html", {username: match[1]})
  }
}

