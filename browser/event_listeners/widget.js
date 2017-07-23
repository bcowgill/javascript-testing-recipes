var Widget = function(container) {
  this._links   = container.find("a")
  this._heading = container.find("h2")

  var self = this

  this._links.on("click", function(event) {
    event.preventDefault()
    var linkText = $(this).text()
    self.changeHeading(linkText)
  })
}

Widget.prototype.changeHeading = function(headingText) {
  this._heading.text(headingText)
}

