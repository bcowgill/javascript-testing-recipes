with (JS.Test) {
	describe("TodoStore.load() [-todo_store_load_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.store = new TodoStore()
			localStorage["items:5"] = JSON.stringify({id: "fake-id", title: "Buy cough syrup"})
		}})

		after(function () { with (this) {
			localStorage.clear()
		}})

		it("emits a 'load' event with an existing item [-todo_store_load_spec:1-]", function () { with (this) {
			expect(store, "trigger").given("load", {id: "fake-id", title: "Buy cough syrup"})
			store.load(5)
		}})

		it("does not emit a 'load' event for unknown IDS [-todo_store_load_spec:2-]", function () { with (this) {
			expect(store, "trigger").given("load", anyArgs()).exactly(0)
			store.load(50)
		}})
	}})
}
