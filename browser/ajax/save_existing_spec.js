with (JS.Test) {
	describe("TodoService.save() existing", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.service = new TodoService()
			this.xhr = new $.Deferred()
			stub($, "ajax").returns(xhr)
		}})

		it("sends the item data to the server", function () { with (this) {
			var params = {type: "PUT", url: "/todos/101", data: {id: 101, title: "Mow the lawn"}}
			expect($, "ajax").given(params).returns(xhr)
			service.save({id: 101, title: "Mow the lawn"})
		}})

		describe("when the request succeeds", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				xhr.resolve({id: 101, title: "Updated title"})
			}})

			it("yields the updated item to the caller", function (resume) { with (this) {
				service.save({id: 101}, function (error, item) {
					resume(function () {
						assertNull( error )
						assertEqual( {id: 101, title: "Updated title"}, item )
					})
				})
			}})

			it("emits an 'update' event with the response data", function (resume) { with (this) {
				expect(service, "trigger").given("update", {id: 101, title: "Updated title"})
				service.save({id: 101}, resume)
			}})
		}})

		describe("when the request fails", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				xhr.reject({status: 412, responseJSON: {error: "Title must not be blank"}})
			}})

			it("yield an error to the caller", function (resume) { with (this) {
				service.save({id: 101}, function (error, item) {
					resume(function () {
						assertEqual( "Title must not be blank", error.message )
						assertSame( undefined, item )
					})
				})
			}})

			it("does not emit an 'update' event", function (resume) {with (this) {
				expect(service, "trigger").given("update", anyArgs()).exactly(0)
				service.save({id: 101}, function () { resume() })
			}})
		}})
	}})
}
