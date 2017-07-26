with (JS.Test) {
	describe("TodoService load [-load_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.service = new TodoService()
		}})

		it("asks the server for an item by ID [-load_spec:1-]", function () { with (this) {
			expect($, "ajax").given(objectIncluding({type: "GET", url: "/todos/101"}))
			service.load(101)
		}})

		describe("when the server returns an item [-load_spec:2-]", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				stub($, "ajax", function (options) {
					options.success.call(options.context, {id: 101, title: "Mow the lawn"})
				})
			}})

			it("yields the item to the caller [-load_spec:3-]", function (resume) { with (this) {
				service.load(101, function (error, item) {
					resume(function () {
						assertNull( error )
						assertEqual( {id: 101, title: "Mow the lawn"}, item )
					})
				})
			}})

			it("emits a 'load' event with the item [-load_spec:4-]", function (resume) { with (this) {
				expect(service, "trigger").given("load", {id: 101, title: "Mow the lawn"})
				service.load(101, resume)
			}})
		}})

		describe("when the request fails [-load_spec:5-]", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				stub($, "ajax", function (options) {
					options.error.call(options.context, {status: 404})
				})
			}})

			it("yields an error to the caller [-load_spec:6-]", function (resume) { with (this) {
				service.load(101, function (error, item) {
					resume(function () {
						assertEqual( "Item #101 not found", error.message )
						assertSame( undefined, item )
					})
				})
			}})

			it("does not emit a 'load' event [-load_spec:7-]", function (resume) { with (this) {
				expect(service, "trigger").given("load", anyArgs()).exactly(0)
				service.load(101, function () { resume() })
			}})
		}})
	}})
}
