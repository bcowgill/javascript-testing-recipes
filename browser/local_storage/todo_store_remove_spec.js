JS.Test.describe("TodoStore.remove()", function() { with(this) {
  before(function() { with(this) {
    stub("localStorage", {})
    stub(localStorage, "getItem")
    stub(localStorage, "removeItem")

    this.store = new TodoStore()
  }})

  it("tells localStorage to look up an item", function() { with(this) {
    expect(localStorage, "getItem").given("items:99")
    store.remove(99)
  }})

  it("emits a 'remove' event if the item exists", function() { with(this) {
    stub(localStorage, "getItem").returns(JSON.stringify({id: "fake-id"}))
    expect(store, "trigger").given("remove", {id: "fake-id"})
    store.remove(99)
  }})

  it("does not emit a 'remove' event if the item does not exist", function() { with(this) {
    stub(localStorage, "getItem").returns(null)
    expect(store, "trigger").given("remove", anyArgs()).exactly(0)
    store.remove(99)
  }})

  it("tells localStorage to remove an item", function() { with(this) {
    expect(localStorage, "removeItem").given("items:99")
    store.remove(99)
  }})
}})

