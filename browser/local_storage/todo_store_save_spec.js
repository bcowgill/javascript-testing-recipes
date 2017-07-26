with (JS.Test) {
	describe("TodoStore.save() [-todo_store_save_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.store = new TodoStore()
		}})

		after(function () { with (this) {
			localStorage.clear()
		}})

		describe("saving a new item [-todo_store_save_spec:1-]", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				store.save({title: "Make breakfast"})
			}})

			it("saves the item as JSON [-todo_store_save_spec:2-]", function () { with (this) {
				var item = JSON.parse(localStorage["items:1"])
				assertEqual( {id: 1, title: "Make breakfast"}, item )
			}})

			it("records the item ID [-todo_store_save_spec:3-]", function () { with (this) {
				assertEqual( "1", localStorage.itemId )
			}})
		}})

		describe("saving an existing item [-todo_store_save_spec:4-]", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				localStorage.itemId = "3"
				localStorage["items:2"] = JSON.stringify({id: 2, title: "Wash up"})
				store.save({id: 2, title: "Renew passport"})
			}})

			it("updates the stored item [-todo_store_save_spec:5-]", function () { with (this) {
				var item = JSON.parse(localStorage["items:2"])
				assertEqual( {id: 2, title: "Renew passport"}, item )
			}})

			it("does not change the item ID [-todo_store_save_spec:6-]", function () { with (this) {
				assertEqual( "3", localStorage.itemId )
			}})
		}})
	}})
}
