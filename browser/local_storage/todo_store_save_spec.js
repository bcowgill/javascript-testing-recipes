with (JS.Test) {
	describe("TodoStore.save()", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.store = new TodoStore()
		}})

		after(function () { with (this) {
			localStorage.clear()
		}})

		describe("saving a new item", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				store.save({title: "Make breakfast"})
			}})

			it("saves the item as JSON", function () { with (this) {
				var item = JSON.parse(localStorage["items:1"])
				assertEqual( {id: 1, title: "Make breakfast"}, item )
			}})

			it("records the item ID", function () { with (this) {
				assertEqual( "1", localStorage.itemId )
			}})
		}})

		describe("saving an existing item", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				localStorage.itemId = "3"
				localStorage["items:2"] = JSON.stringify({id: 2, title: "Wash up"})
				store.save({id: 2, title: "Renew passport"})
			}})

			it("updates the stored item", function () { with (this) {
				var item = JSON.parse(localStorage["items:2"])
				assertEqual( {id: 2, title: "Renew passport"}, item )
			}})

			it("does not change the item ID", function () { with (this) {
				assertEqual( "3", localStorage.itemId )
			}})
		}})
	}})
}
