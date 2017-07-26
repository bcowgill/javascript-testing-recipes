var JS          = require("jstest"),
    events      = require("events"),
    Accumulator = require("./accumulator")

JS.Test.describe("Accumulator [-accumulator_spec:0-]", function() { with(this) {
  before(function() { with(this) {
    this.emitter     = new events.EventEmitter()
    this.accumulator = new Accumulator(emitter)
  }})

  it("sums the numbers produced by the emitter [-accumulator_spec:1-]", function() { with(this) {
    [1, 1, 2, 3, 5, 8].forEach(function(n) {
      emitter.emit("number", n)
    })
    assertEqual( 20, accumulator.sum )
  }})
}})

