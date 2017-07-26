var JS         = require("jstest"),
    presenters = require("../lib/presenters")

JS.Test.describe("Presenters [-presenters_spec:0-]", function() { with(this) {
  before(function() { with(this) {
    this.issue = {
      number:     99,
      title:      "The 99th problem",
      html_url:   "http://example.com/issues/99",
      user:       {login: "zee-j"},
      created_at: "2013-10-24T19:00:29Z"
    }
  }})

  it("presents an issue as text [-presenters_spec:1-]", function() { with(this) {
    assertEqual( "#99: The 99th problem\n" +
                 "http://example.com/issues/99\n" +
                 "[zee-j] Thu, 24 Oct 2013 19:00:29 GMT\n",
                 presenters.text(issue) )
  }})
}})

