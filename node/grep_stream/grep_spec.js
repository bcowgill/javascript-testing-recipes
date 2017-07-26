var JS     = require("jstest"),
    concat = require("concat-stream"),
    grep   = require("./grep_stream"),
    Source = require("../streams/source")

JS.Test.describe("grep [-grep_spec:0-]", function() { with(this) {
  before(function() { with(this) {
    this.stream = new Source(["be", "ep\nb", "oo", "p"], 10)
  }})

  it("filters for matching lines in the input [-grep_spec:1-]", function(resume) { with(this) {
    stream.pipe(grep("boo")).pipe(concat(function(result) {
      resume(function() {
        assertEqual( "boop\n", result.toString("utf8") )
      })
    }))
  }})
}})

