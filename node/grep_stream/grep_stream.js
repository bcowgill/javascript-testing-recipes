var combine = require("stream-combiner"),
    split   = require("split"),
    Filter  = require("./filter"),
    join    = require("./join")

var grep = function(query) {
  return combine(split("\n"), new Filter(query), join("\n"))
}

module.exports = grep

