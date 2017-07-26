with (JS.Test) {
	describe("TodoStore", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.store = new TodoStore()
		}})

		after(function () { with (this) {
			localStorage.clear()
		}})

		describe("save()", function () { with (this) { addSkip(this)
			it("assigns a sequential ID to new items", function () { with (this) {
				var items = [{title: "Make breakfast"}, {title: "Wash up"}]
				store.save(items[0])
				assertEqual( 1, items[0].id )
				store.save(items[1])
				assertEqual( 2, items[1].id )
			}})

			it("does not change the ID of existing items", function () { with (this) {
				var item = {id: 42, title: "Discover meaning of life"}
				store.save(item)
				assertEqual( 42, item.id )
			}})

			it("emits a 'create' event for new items", function () { with (this) {
				expect(store, "trigger").given("create", {id: 1, title: "Renew passport"})
				store.save({title: "Renew passport"})
			}})

			it("emits an 'update' event for existing items", function () { with (this) {
				expect(store, "trigger").given("update", {id: 1, title: "Renew passport"})
				store.save({id: 1, title: "Renew passport"})
			}})
		}})

		describe("load()", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				store.save({title: "Make breakfast"})
			}})

			it("emits a 'load' event with the data for the ID", function () { with (this) {
				expect(store, "trigger").given("load", {id: 1, title: "Make breakfast"})
				store.load(1)
			}})
		}})

		describe("remove()", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				store.save({title: "Make breakfast"})
			}})

			it("emits a 'remove' event with the data for the ID", function () { with (this) {
				expect(store, "trigger").given("remove", {id: 1, title: "Make breakfast"})
				store.remove(1)
			}})

			it("deletes the item from the collection", function () { with (this) {
				store.remove(1)
				expect(store, "trigger").given("load", anyArgs()).exactly(0)
				store.load(1)
			}})
		}})
	}})
}
