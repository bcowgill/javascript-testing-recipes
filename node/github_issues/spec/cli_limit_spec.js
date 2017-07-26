var JS     = require("jstest"),
    fs     = require("fs"),
    path   = require("path"),
    stream = require("stream"),
    concat = require("concat-stream"),
    CLI    = require("../lib/cli_limit"),
    github = require("../lib/github")

JS.Test.describe("CLI with limit [-cli_limit_spec:0-]", function() { with(this) {
  before(function() { with(this) {
    this.stdout = new stream.PassThrough()
    this.cli = new CLI({
      argv:   ["node", "bin/github", "foo", "bar", "--limit", "1"],
      stdout: stdout
    })
    var fixture = fs.readFileSync(path.join(__dirname, "fixtures", "issues.json"), "utf8")
    expect(github, "getIssues").given("foo", "bar").yields([null, JSON.parse(fixture)])
  }})

  it("displays a limited number of issues [-cli_limit_spec:1-]", function(resume) { with(this) {
    cli.run(function() { stdout.end() })

    stdout.pipe(concat(function(output) {
      resume(function() {
        assertEqual(
          '1 open issues:\n' +
          '\n' +
          '#27: Forward networking error events to the websocket event listeners.\n' +
          'https://github.com/faye/faye-websocket-node/pull/27\n' +
          '[ramsperger] Thu, 24 Oct 2013 19:00:29 GMT\n' +
          '\n',
          output.toString("utf8") )
      })
    }))
  }})
}})

