var browser = require("testium").getBrowser(),
    assert  = require("assert"),
    User    = require("../../orm/persisted_user"),
    store   = require("../../orm/store")

store.configure({host: "127.0.0.1", port: 6379, database: 15})

describe("Chatting [-chat_spec:2-]", function() {
  beforeEach(function(resume) {
    new User({username: "bob", password: "sideshow", workFactor: 1}).save(resume)
  })

  afterEach(function(resume) {
    browser.navigateTo("/")
    browser.clearCookies()
    store.getConnection().flushdb(resume)
  })

  it("displays messages the user posts [-chat_spec:3-]", function() {
    browser.navigateTo("/login")
    browser.type("[name=username]", "bob")
    browser.type("[name=password]", "sideshow")
    browser.click("[type=submit]")

    browser.type("[name=room]", "attic")
    browser.click("form.room [type=submit]")

    browser.type("[name=message]", "Hi, everyone!")
    browser.click("form.message [type=submit]")

    browser.waitForElement(".messages li")
    browser.assert.elementHasText(".messages li", "bob: Hi, everyone!")
  })
})

