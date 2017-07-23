var View = Backbone.View.extend({
  events: {
    "click a": "handleLinkClick"
  },

  handleLinkClick: function(event) {
    event.preventDefault()
    var linkText = $(event.target).text()
    this.$("h2").text(linkText)
  }
})

