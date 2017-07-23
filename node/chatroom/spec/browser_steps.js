var JS      = require("jstest"),
    Browser = require("./browser"),
    store   = require("../../orm/store")

module.exports = JS.Test.asyncSteps({
  startServer: function(server, callback) {
    this.server = server
    this.server.listen(0, callback)

    this.port   = this.server.address().port
    this.origin = "http://localhost:" + this.port
  },

  stopServer: function(callback) {
    this.server.close(callback)
  },

  createBrowser: function(callback) {
    this.browser = new Browser("Mozilla/5.0 (KHTML, like Gecko)", this.origin)
    callback()
  },

  visit: function(pathname, callback) {
    this.browser.visit(pathname, callback)
  },

  clickLink: function(selector, callback) {
    var link = this.browser.dom(selector)
    this.browser.clickLink(link, callback)
  },

  fillIn: function(selector, text, callback) {
    this.browser.dom(selector).val(text)
    callback()
  },

  clickButton: function(selector, callback) {
    var form = this.browser.dom(selector).parents("form")
    this.browser.submitForm(form, callback)
  },

  checkPath: function(pathname, callback) {
    this.assertEqual(pathname, this.browser.location.pathname)
    callback()
  },

  checkText: function(selector, text, callback) {
    var node = this.browser.dom(selector)
    this.assertEqual(text, node.text())
    callback()
  },

  cleanDatabase: function(callback) {
    store.getConnection().flushdb(callback)
  }
})

