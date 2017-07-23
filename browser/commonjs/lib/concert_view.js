var handlebars = require("handlebars"),
    templates  = require("../templates/templates")

var ConcertView = function(selector, concert) {
  this._element = $(selector)
  this._concert = concert

  var self = this
  concert.on("change", function() { self.render() })

  this.render()
}

ConcertView.prototype.render = function() {
  var html = handlebars.templates.concert(this._concert.attributes)
  this._element.html(html)
}

module.exports = ConcertView

