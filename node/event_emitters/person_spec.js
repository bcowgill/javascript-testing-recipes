var JS     = require("jstest"),
    Person = require("./person")

JS.Test.describe("Person", function() { with(this) {
  before(function() { with(this) {
    this.person = new Person({name: "Alice"})
  }})

  it("emits events when attributes change", function() { with(this) {
    expect(person.change.name, "emit").given("Merlin")
    person.set({name: "Merlin", occupation: "ceramicist"})
  }})
}})


