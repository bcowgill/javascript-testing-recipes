var JS     = require("jstest"),
    Filter = require("./filter")

JS.Test.describe("filter [-filter_spec:0-]", function() { with(this) {
  before(function() { with(this) {
    this.filter = new Filter("lo")
  }})

  it("pushes chunks that match the query [-filter_spec:1-]", function(resume) { with(this) {
    expect(filter, "push").given("hello")
    filter._transform(new Buffer("hello"), "utf8", resume)
  }})

  it("doesn't push chunks that don't match the query [-filter_spec:2-]", function(resume) { with(this) {
    expect(filter, "push").exactly(0)
    filter._transform(new Buffer("goodbye"), "utf8", resume)
  }})
}})

