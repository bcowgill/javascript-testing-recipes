var JS     = require("jstest"),
    github = require("../lib/github"),
    events = require("events"),
    fs     = require("fs"),
    https  = require("https"),
    path   = require("path")

JS.Test.describe("GitHub", function() { with(this) {
  before(function() { with(this) {
    this.request  = new events.EventEmitter()
    this.response = fs.createReadStream(path.join(__dirname, "fixtures", "issues.json"))

    var params = {method: "GET", host: "api.github.com", path: "/repos/foo/bar/issues"}
    stub(https, "request").given(objectIncluding(params)).returns(request)
    stub(request, "end")
  }})

  it("yields the issues on a 200 response", function(resume) { with(this) {
    github.getIssues("foo", "bar", function(error, issues) {
      resume(function() {
        assertNull( error )
        assertEqual( 3, issues.length )
        assertMatch( /^Forward networking error events/, issues[0].title )
      })
    })
    response.statusCode = 200
    request.emit("response", response)
  }})

  it("yields an error on a 404 response", function(resume) { with(this) {
    github.getIssues("foo", "bar", function(error, issues) {
      resume(function() {
        assertEqual( "Repository not found: /repos/foo/bar/issues", error.message )
        assertEqual( undefined, issues )
      })
    })
    response.statusCode = 404
    request.emit("response", response)
  }})

  it("yields an error on request error", function(resume) { with(this) {
    github.getIssues("foo", "bar", function(error, issues) {
      resume(function() {
        assertEqual( "Error connecting to GitHub: No network connection", error.message )
        assertEqual( undefined, issues )
      })
    })
    request.emit("error", new Error("No network connection"))
  }})
}})

