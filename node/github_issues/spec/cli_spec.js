var JS     = require("jstest"),
    fs     = require("fs"),
    path   = require("path"),
    stream = require("stream"),
    concat = require("concat-stream"),
    CLI    = require("../lib/cli"),
    github = require("../lib/github")

JS.Test.describe("CLI [-cli_spec:0-]", function() { with(this) {
  before(function() { with(this) {
    this.stdout = new stream.PassThrough()
    this.cli = new CLI({
      argv:   ["none", "bin/github", "foo", "bar"],
      stdout: stdout
    })
  }})

  describe("when GitHub returns issues [-cli_spec:1-]", function() { with(this) {
    before(function() { with(this) {
      var fixture = fs.readFileSync(path.join(__dirname, "fixtures", "issues.json"), "utf8")
      expect(github, "getIssues").given("foo", "bar").yields([null, JSON.parse(fixture)])
    }})

    it("displays the issues [-cli_spec:2-]", function(resume) { with(this) {
      cli.run(function() { stdout.end() })

      stdout.pipe(concat(function(output) {
        resume(function() {
          assertEqual(
            '3 open issues:\n' +
            '\n' +
            '#27: Forward networking error events to the websocket event listeners.\n' +
            'https://github.com/faye/faye-websocket-node/pull/27\n' +
            '[ramsperger] Thu, 24 Oct 2013 19:00:29 GMT\n' +
            '\n' +
            '#26: Allow server to limit max frame length (avoid DOS and crash)\n' +
            'https://github.com/faye/faye-websocket-node/issues/26\n' +
            '[glasser] Sat, 12 Oct 2013 02:12:05 GMT\n' +
            '\n' +
            '#16: Compression support with "deflate-frame" protocol extension\n' +
            'https://github.com/faye/faye-websocket-node/issues/16\n' +
            '[nilya] Fri, 14 Sep 2012 00:37:40 GMT\n' +
            '\n',
            output.toString("utf8") )
        })
      }))
    }})
  }})

  describe("when GitHub returns an error [-cli_spec:3-]", function() { with(this) {
    before(function() { with(this) {
      stub(github, "getIssues").given("foo", "bar").yields([new Error("ECONNREFUSED")])
    }})

    it("yields the error [-cli_spec:4-]", function(resume) { with(this) {
      cli.run(function(error) {
        resume(function() { assertEqual( "ECONNREFUSED", error.message ) })
      })
    }})
  }})
}})

