var bindLinkEvents = function(container) {
  container.find("a").on("click", function(event) {
    event.preventDefault()
    var linkText = $(this).text()
    container.find("h2").text(linkText)
  })
}

