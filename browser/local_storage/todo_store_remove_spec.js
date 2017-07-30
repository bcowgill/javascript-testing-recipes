// it seems some browsers don't allow you to stub out the global localStorage object and this test plan fails
// it's been modified to stub out Storage.prototype methods so it doesn't verify that localStorage is being used
// you could change the implementation to sessionStorage and this suite would pass.
with (JS.Test) {
	describe("TodoStore.remove() [-todo_store_remove_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			// stub("localStorage", {}) // NOT ALLOWED on recent browsers
			// stub(localStorage, "getItem")
			// stub(localStorage, "removeItem")
			this.testStorage = Storage.prototype
			stub(testStorage, "getItem")
			stub(testStorage, "removeItem")

			this.store = new TodoStore()
		}})

		it("tells localStorage to look up an item [-todo_store_remove_spec:1-]", function () { with (this) {
			// expect(localStorage, "getItem").given("items:99")
			expect(testStorage, "getItem").given("items:99")
			store.remove(99)
		}})

		it("emits a 'remove' event if the item exists [-todo_store_remove_spec:2-]", function () { with (this) {
			// stub(localStorage, "getItem").returns(JSON.stringify({id: "fake-id"}))
			stub(testStorage, "getItem").returns(JSON.stringify({id: "fake-id"}))
			expect(store, "trigger").given("remove", {id: "fake-id"})
			store.remove(99)
		}})

		it("does not emit a 'remove' event if the item does not exist [-todo_store_remove_spec:3-]", function () { with (this) {
			// stub(localStorage, "getItem").returns(null)
			stub(testStorage, "getItem").returns(null)
			expect(store, "trigger").given("remove", anyArgs()).exactly(0)
			store.remove(99)
		}})

		it("tells localStorage to remove an item [-todo_store_remove_spec:4-]", function () { with (this) {
			// expect(localStorage, "removeItem").given("items:99")
			stub(testStorage, "getItem").returns(JSON.stringify({id: "fake-id"}))
			expect(testStorage, "removeItem").given("items:99")
			store.remove(99)
		}})

		it("remove from localStorage only if it exists  [-todo_store_remove_spec:5-]", function () { with (this) {
			stub(testStorage, "getItem").returns(null)
			expect(testStorage, "removeItem").exactly(0)
			store.remove(999)
		}})
	}})
}
