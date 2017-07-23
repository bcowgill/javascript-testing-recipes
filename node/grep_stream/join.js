var through = require("through")

var join = function(separator) {
  return through(function(chunk) {
    this.push(chunk)
    this.push(new Buffer(separator || "\n"))
  })
}

module.exports = join

