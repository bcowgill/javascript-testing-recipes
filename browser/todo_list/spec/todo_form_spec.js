with (JS.Test) {
	describe("TodoForm", function () { with (this) { addSkip(this)
		extend(HtmlFixture)
		fixture(FORM_HTML)

		before(function () { with (this) {
			stub("App", {todoList: {}})
			new TodoForm(fixture.find(".todo-form"))
		}})

		it("saves a new item", function (resume) { with (this) {
			expect(App.todoList, "saveItem").given({id: "", title: "Buy milk", body: ""})
			fixture.find("[name=title]").val("Buy milk")
			Syn.click(fixture.find("[type=submit]"), resume)
		}})

		// and so on for other cases ...
	}})
}
