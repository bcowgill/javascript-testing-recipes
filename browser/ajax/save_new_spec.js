with (JS.Test) {
	describe("TodoService.save() new [-save_new_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.service = new TodoService()
		}})

		it("sends the item to the server [-save_new_spec:1-]", function () { with (this) {
			expect($, "post").given("/todos", {title: "Take out the garbage"}, instanceOf(Function))
			service.save({title: "Take out the garbage"})
		}})

		describe("when the request succeeds [-save_new_spec:2-]", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				stub($, "post").yields([{id: 29}])
			}})

			it("yields the new ID to the caller [-save_new_spec:3-]", function (resume) { with (this) {
				service.save({}, function (error, response) {
					resume(function () {
						assertNull( error )
						assertEqual( {id: 29}, response )
					})
				})
			}})

			it("emits a 'create' event with the complete item [-save_new_spec:4-]", function (resume) { with (this) {
				expect(service, "trigger").given("create", {id: 29, title: "Publish a book"})
				service.save({title: "Publish a book"}, resume)
			}})
		}})
	}})
}
