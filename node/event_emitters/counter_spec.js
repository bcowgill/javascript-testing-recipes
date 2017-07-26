var JS      = require("jstest"),
    Counter = require("./counter")

JS.Test.describe("Counter [-counter_spec:2-]", function() { with(this) {
  before(function() { with(this) {
    this.counter = new Counter()
  }})

  it("emits the natural numbers in order [-counter_spec:3-]", function() { with(this) {
    var numbers = []
    counter.on("number", function(n) { numbers.push(n) })
    for (var i = 0; i < 3; i++) {
      counter.count()
    }
    assertEqual( [1, 2, 3], numbers )
  }})
}})

