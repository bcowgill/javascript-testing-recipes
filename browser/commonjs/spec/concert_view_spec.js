var JS      = require("jstest"),
    Concert = require("../lib/concert"),
    View    = require("../lib/concert_view")

JS.Test.describe("ConcertView [-concert_view_spec:3-]", function() { with(this) {
  extend(HtmlFixture)
  fixture(' <div class="concert"></div> ')

  before(function() { with(this) {
    this.concert = new Concert({
      artist:    "Boredoms",
      venueName: "The Forum",
      cityName:  "Kentish Town",
      country:   "UK"
    })
    new View(".concert", concert)
  }})

  it("renders the artist name [-concert_view_spec:4-]", function() { with(this) {
    assertEqual( "Boredoms", fixture.find(".artist").text() )
  }})

  it("updates the artist name if it changes [-concert_view_spec:5-]", function() { with(this) {
    concert.set("artist", "Low")
    assertEqual( "Low", fixture.find(".artist").text() )
  }})
}})

