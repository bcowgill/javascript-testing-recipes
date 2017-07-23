var JS      = require("jstest"),
    Counter = require("./counter")

JS.Test.describe("Counter", function() { with(this) {
  before(function() { with(this) {
    this.counter = new Counter()
  }})

  it("emits the natural numbers in order", function() { with(this) {
    var numbers = []
    counter.on("number", function(n) { numbers.push(n) })
    for (var i = 0; i < 3; i++) {
      counter.count()
    }
    assertEqual( [1, 2, 3], numbers )
  }})
}})

