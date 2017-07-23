var browser = require("testium").getBrowser(),
    assert  = require("assert"),
    url     = require("url"),
    User    = require("../../orm/persisted_user"),
    store   = require("../../orm/store")

store.configure({host: "127.0.0.1", port: 6379, database: 15})

describe("Logging in", function() {
  var pathname = function() {
    return url.parse(browser.getUrl()).pathname
  }

  beforeEach(function(resume) {
    new User({username: "bob", password: "sideshow", workFactor: 1}).save(resume)
  })

  afterEach(function(resume) {
    browser.navigateTo("/")
    browser.clearCookies()
    store.getConnection().flushdb(resume)
  })

  it("redirects to the chat page on successful login", function() {
    browser.navigateTo("/login")
    browser.type("[name=username]", "bob")
    browser.type("[name=password]", "sideshow")
    browser.click("[type=submit]")
    assert.equal(pathname(), "/chat")
    browser.assert.elementHasText(".navigation li:first-child", "Logged in as bob")
  })

  it("renders the form with an error on failed login", function() {
    browser.navigateTo("/login")
    browser.type("[name=username]", "bob")
    browser.type("[name=password]", "the-wrong-word")
    browser.click("[type=submit]")
    assert.equal(pathname(), "/login")
    browser.assert.elementHasText(".error", "Invalid username or password")
  })
})

