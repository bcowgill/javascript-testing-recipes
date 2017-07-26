var JS     = require("jstest"),
    concat = require("concat-stream"),
    Source = require("./source"),
    Upcase = require("./upcase_transform")

JS.Test.describe("Upcase.pipe() [-upcase_spec:0-]", function() { with(this) {
  before(function() { with(this) {
    this.source = new Source(["a", "b", "c"], 10)
  }})

  it("transforms its input to uppercase [-upcase_spec:1-]", function(resume) { with(this) {
    var stream = source.pipe(new Upcase())
    stream.setEncoding("utf8")

    stream.pipe(concat(function(output) {
      resume(function() {
        assertEqual( "ABC", output )
      })
    }))
  }})
}})



