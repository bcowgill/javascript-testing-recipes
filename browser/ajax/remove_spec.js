with (JS.Test) {
	describe("TodoService.remove()", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.service  = new TodoService()
			this.xhr      = sinon.useFakeXMLHttpRequest()
			this.requests = []

			xhr.onCreate = function (request) {
				requests.push(request)
			}
		}})

		after(function () { with (this) {
			xhr.restore()
		}})

		it("tells the server to delete the item", function () { with (this) {
			service.remove(101)
			assertEqual( "DELETE", requests[0].method )
			assertEqual( "/todos/101", requests[0].url )
		}})

		it("emits a 'remove' event with the response", function (resume) { with (this) {
			expect(service, "trigger").given("remove", {id: 101})
			service.remove(101, resume)
			requests[0].respond(200, {"Content-Type": "application/json"}, '{"id":101}')
		}})
	}})
}
