var JS          = require("jstest"),
    Counter     = require("./counter"),
    Accumulator = require("./accumulator")

JS.Test.describe("Counting", function() { with(this) {
  before(function() { with(this) {
    this.counter     = new Counter()
    this.accumulator = new Accumulator(counter)
  }})

  it("sums the natural numbers", function() { with(this) {
    for (var i = 0; i < 5; i++) {
      counter.count()
    }
    assertEqual( 15, accumulator.sum )
  }})
}})

