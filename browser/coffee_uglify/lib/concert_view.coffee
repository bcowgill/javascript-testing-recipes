ConcertView = Backbone.View.extend
  initialize: ->
    @render()
    @model.on "change", => @render()

  render: ->
    html = Handlebars.templates.concert(@model.attributes)
    @$el.html(html)

window.ConcertView = ConcertView

