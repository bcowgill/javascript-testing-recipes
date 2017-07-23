var JS     = require("jstest"),
    Source = require("./source")

JS.Test.describe("Source events", function() { with(this) {
  before(function() { with(this) {
    this.stream = new Source(["a", "b", "c"], 10)
    stream.setEncoding("utf8")
  }})

  it("yields output via the 'data' event", function(resume) { with(this) {
    var data = []
    stream.on("data", data.push.bind(data))

    stream.on("end", function() {
      resume(function() {
        assertEqual( ["a", "b", "c"], data )
      })
    })
  }})
}})

