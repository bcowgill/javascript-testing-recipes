with (JS.Test) {
	describe("TodoStore.remove() [-todo_store_remove_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			stub("localStorage", {})
			stub(localStorage, "getItem")
			stub(localStorage, "removeItem")

			this.store = new TodoStore()
		}})

		it("tells localStorage to look up an item [-todo_store_remove_spec:1-]", function () { with (this) {
			expect(localStorage, "getItem").given("items:99")
			store.remove(99)
		}})

		it("emits a 'remove' event if the item exists [-todo_store_remove_spec:2-]", function () { with (this) {
			stub(localStorage, "getItem").returns(JSON.stringify({id: "fake-id"}))
			expect(store, "trigger").given("remove", {id: "fake-id"})
			store.remove(99)
		}})

		it("does not emit a 'remove' event if the item does not exist [-todo_store_remove_spec:3-]", function () { with (this) {
			stub(localStorage, "getItem").returns(null)
			expect(store, "trigger").given("remove", anyArgs()).exactly(0)
			store.remove(99)
		}})

		it("tells localStorage to remove an item [-todo_store_remove_spec:4-]", function () { with (this) {
			expect(localStorage, "removeItem").given("items:99")
			store.remove(99)
		}})
	}})
}
