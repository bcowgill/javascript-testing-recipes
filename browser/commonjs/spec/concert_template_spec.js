var JS         = require("jstest"),
    handlebars = require("handlebars"),
    templates  = require("../templates/templates")

JS.Test.describe("templates.concert() [-concert_template_spec:3-]", function() { with(this) {
  before(function() { with(this) {
    this.concert = {
      artist:    "Boredoms",
      venueName: "The Forum",
      cityName:  "Kentish Town",
      country:   "UK"
    }
    this.html = $(handlebars.templates.concert(concert))
  }})

  it("renders the artist name [-concert_template_spec:4-]", function() { with(this) {
    assertEqual( "Boredoms", html.find(".artist").text() )
  }})

  it("renders the venue details [-concert_template_spec:5-]", function() { with(this) {
    assertEqual( "The Forum, Kentish Town, UK", html.find(".venue").text() )
  }})
}})

