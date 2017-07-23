JS.Test.describe "ConcertView", ->
  @extend HtmlFixture
  @fixture '<div class="concert"></div>'

  @before ->
    @concert = new Concert
      artist:    "Boredoms",
      venueName: "The Forum",
      cityName:  "Kentish Town",
      country:   "UK"

    new ConcertView(el: ".concert", model: @concert)

  @it "renders the artist name", ->
    @assertEqual "Boredoms", @fixture.find(".artist").text()

  @it "updates the artist name if it changes", ->
    @concert.set "artist", "Low"
    @assertEqual "Low", @fixture.find(".artist").text()

