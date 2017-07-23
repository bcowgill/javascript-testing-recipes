var JS         = require("jstest"),
    handlebars = require("handlebars"),
    templates  = require("../templates/templates")

JS.Test.describe("templates.concert()", function() { with(this) {
  before(function() { with(this) {
    this.concert = {
      artist:    "Boredoms",
      venueName: "The Forum",
      cityName:  "Kentish Town",
      country:   "UK"
    }
    this.html = $(handlebars.templates.concert(concert))
  }})

  it("renders the artist name", function() { with(this) {
    assertEqual( "Boredoms", html.find(".artist").text() )
  }})

  it("renders the venue details", function() { with(this) {
    assertEqual( "The Forum, Kentish Town, UK", html.find(".venue").text() )
  }})
}})

