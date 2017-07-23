var https  = require("https"),
    concat = require("concat-stream")

var GitHub = {
  HOSTNAME: "api.github.com",

  getIssues: function(owner, repo, callback) {
    var path    = "/repos/" + owner + "/" + repo + "/issues",
        headers = {"User-Agent": "Node.js"},
        params  = {method: "GET", host: this.HOSTNAME, path: path, headers: headers},
        request = https.request(params)

    request.on("response", function(response) {
      if (response.statusCode !== 200) {
        return callback(new Error("Repository not found: " + path))
      }
      response.pipe(concat(function(body) {
        var issues = JSON.parse(body.toString("utf8"))
        callback(null, issues)
      }))
    })

    request.on("error", function(error) {
      callback(new Error("Error connecting to GitHub: " + error.message))
    })

    request.end()
  }
}

module.exports = GitHub

