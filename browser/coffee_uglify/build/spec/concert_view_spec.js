// Generated by CoffeeScript 1.7.1
(function() {
  JS.Test.describe("ConcertView", function() {
    this.extend(HtmlFixture);
    this.fixture('<div class="concert"></div>');
    this.before(function() {
      this.concert = new Concert({
        artist: "Boredoms",
        venueName: "The Forum",
        cityName: "Kentish Town",
        country: "UK"
      });
      return new ConcertView({
        el: ".concert",
        model: this.concert
      });
    });
    this.it("renders the artist name", function() {
      return this.assertEqual("Boredoms", this.fixture.find(".artist").text());
    });
    return this.it("updates the artist name if it changes", function() {
      this.concert.set("artist", "Low");
      return this.assertEqual("Low", this.fixture.find(".artist").text());
    });
  });

}).call(this);
