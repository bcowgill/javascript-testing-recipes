var browser = require("testium").getBrowser(),
    assert  = require("assert"),
    url     = require("url"),
    store   = require("../../orm/store")

store.configure({host: "127.0.0.1", port: 6379, database: 15})

describe("Signing up [-signup_spec:0-]", function() {
  var pathname = function() {
    return url.parse(browser.getUrl()).pathname
  }

  afterEach(function(resume) {
    browser.navigateTo("/")
    browser.clearCookies()
    store.getConnection().flushdb(resume)
  })

  it("redirects to the signup page when not logged in [-signup_spec:1-]", function() {
    browser.navigateTo("/")
    assert.equal(pathname(), "/signup")
  })

  it("rejects invalid usernames [-signup_spec:2-]", function() {
    browser.navigateTo("/signup")
    browser.type("[name=username]", "$%^&")
    browser.click("[type=submit]")
    assert.equal(pathname(), "/signup")
    browser.assert.elementHasText(".error li:first-child",
        "Usernames may only contain letters, numbers and underscores")
  })

  it("rejects blank passwords [-signup_spec:3-]", function() {
    browser.navigateTo("/signup")
    browser.click("[type=submit]")
    assert.equal(pathname(), "/signup")
    browser.assert.elementHasText(".error li:last-child", "Password must not be blank")
  })

  it("accepts valid sign-ups [-signup_spec:4-]", function() {
    browser.navigateTo("/signup")
    browser.type("[name=username]", "alice")
    browser.type("[name=password]", "something")
    browser.click("[type=submit]")
    assert.equal(pathname(), "/chat")
    browser.assert.elementHasText(".navigation li:first-child", "Logged in as alice")
  })
})

