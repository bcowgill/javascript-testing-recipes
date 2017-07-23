var JS     = require("jstest"),
    concat = require("concat-stream"),
    Source = require("./source")

JS.Test.describe("Source.pipe()", function() { with(this) {
  before(function() { with(this) {
    this.stream = new Source(["a", "b", "c"], 10)
    stream.setEncoding("utf8")
  }})

  it("emits all the output", function(resume) { with(this) {
    stream.pipe(concat(function(output) {
      resume(function() {
        assertEqual( "abc", output )
      })
    }))
  }})
}})


