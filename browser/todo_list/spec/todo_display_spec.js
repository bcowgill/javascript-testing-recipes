with (JS.Test) {
	describe("TodoDisplay [-todo_display_spec:0-]", function () { with (this) { addSkip(this)
		extend(HtmlFixture)

		fixture(' \
			<table class="todo-list"> \
				<thead> \
					<tr> \
						<th scope="col">Title</th> \
						<th scope="col">Actions</th> \
					</tr> \
				</thead> \
				<tbody></tbody> \
			</table> ')

		before(function () { with (this) {
			this.model   = _.clone(Backbone.Events)
			this.display = new TodoDisplay(fixture.find(".todo-list"), model)

			model.trigger("create", {id: 37, title: "Pay rent"})
		}})

		it("displays the item [-todo_display_spec:1-]", function () { with (this) {
			var titles = $.map(fixture.find("a"), function (a) { return $(a).text() })
			assertEqual( ["Pay rent"], titles )
		}})

		it("updates the item [-todo_display_spec:2-]", function () { with (this) {
			model.trigger("update", {id: 37, title: "Submit tax return"})
			var titles = $.map(fixture.find("a"), function (a) { return $(a).text() })
			assertEqual( ["Submit tax return"], titles )
		}})

		it("loads an item when clicked [-todo_display_spec:3-]", function (resume) { with (this) {
			expect(model, "load").given(37)
			Syn.click(fixture.find("tbody a"), resume)
		}})

		it("tells the model to remove an item [-todo_display_spec:4-]", function (resume) { with (this) {
			expect(model, "remove").given(37)
			Syn.click(fixture.find("tbody .delete-form [type=submit]"), resume)
		}})

		it("removes a deleted item from view [-todo_display_spec:5-]", function () { with (this) {
			model.trigger("remove", {id: 37})
			var titles = $.map(fixture.find("a"), function (a) { return $(a).text() })
			assertEqual( [], titles )
		}})
	}})
}
