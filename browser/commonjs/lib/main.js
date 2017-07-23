var Concert = require("./concert"),
    View    = require("./concert_view")

var model = new Concert({
  artist:    "Mogwai",
  venueName: "Royal Festival Hall",
  cityName:  "London",
  country:   "UK"
})

new View(".concert", model)

