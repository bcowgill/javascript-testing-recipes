JS.Test.describe "templates.concert()", ->
  @before ->
    @concert =
      artist:    "Boredoms",
      venueName: "The Forum",
      cityName:  "Kentish Town",
      country:   "UK"

    @html = $(Handlebars.templates.concert(@concert))

  @it "renders the artist name", ->
    @assertEqual "Boredoms", @html.find(".artist").text()

  @it "renders the venue details", ->
    @assertEqual "The Forum, Kentish Town, UK", @html.find(".venue").text()

