var cheerio = require("cheerio"),
    path    = require("path"),
    request = require("request"),
    url     = require("url"),
    _       = require("underscore")
    
var Browser = function(userAgent, origin) {
  this.location = url.parse(origin)
  this._cookies = request.jar()
  this._headers = {"Accept": "text/html", "User-Agent": userAgent}
}

Browser.prototype.visit = function(uri, callback) {
  this._request("get", uri, {}, callback)
}

Browser.prototype.clickLink = function(link, callback) {
  this._request("get", link.attr("href"), {}, callback)
}

Browser.prototype.submitForm = function(form, callback) {
  var method = (form.attr("method") || "get").toLowerCase(),
      action = form.attr("action") || "",
      data   = {},
      self   = this

  form.find("input, select, textarea").each(function(i, input) {
    input = self.dom(input)
    var name = input.attr("name"), type = input.attr("type") || ""

    if (name && (!type.match(/checkbox|radio/) || input.attr("checked") !== undefined)) {
      data[name] = input.val() || ""
    }
  })
  this._request(method, action, data, callback)
}

Browser.prototype._request = function(method, uri, params, callback) {
  var headers = _.extend({"Referer": this.location.href}, this._headers),
      options = {followRedirect: false, headers: headers, jar: this._cookies},
      self    = this

  options[method === "post" ? "form" : "qs"] = params
  uri = url.resolve(this.location.href, uri)
  this.location = url.parse(uri)

  request[method](uri, options, function(error, response, body) {
    self.status  = response.statusCode
    self.headers = response.headers
    self.body    = body

    if (self.status >= 300 && self.status < 400 && self.headers.location) {
      self._request("get", self.headers.location, {}, callback)
    } else {
      self.dom = cheerio.load(self.body)
      callback()
    }
  })
}

module.exports = Browser

