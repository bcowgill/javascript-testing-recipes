with (JS.Test) {
	describe("TodoEditor [-todo_editor_spec:0-]", function () { with (this) { addSkip(this)
		extend(HtmlFixture)

		fixture(' \
			<div class="todo-form"> \
				<p><a class="new-todo" href="/todos/new">Create item</a></p> \
				<form method="post" action="/todos"> \
					<input type="hidden" name="id"> \
					<p> \
						<label for="todo-title">Title</label> \
						<input type="text" name="title" id="todo-title"> \
					</p> \
					<p> \
						<label for="todo-body">Body</label><br> \
						<textarea name="body" id="todo-body"></textarea> \
					</p> \
					<input type="submit" value="Save"> \
				</form> \
			</div> ')

		before(function () { with (this) {
			this.model  = _.clone(Backbone.Events)
			this.editor = new TodoEditor(fixture.find(".todo-form"), model)
		}})

		it("does not save an invalid item [-todo_editor_spec:1-]", function (resume) { with (this) {
			expect(model, "save").exactly(0)
			Syn.click(fixture.find("[type=submit]"), function () {
				resume(function () {
					assertEqual( "Title cannot be blank", fixture.find(".error").text() )
				})
			})
		}})

		it("saves a new item [-todo_editor_spec:2-]", function (resume) { with (this) {
			expect(model, "save").given({id: "", title: "Buy milk", body: ""})
			fixture.find("[name=title]").val("Buy milk")
			Syn.click(fixture.find("[type=submit]"), resume)
		}})

		it("edits an existing item's title [-todo_editor_spec:3-]", function (resume) { with (this) {
			expect(model, "save").given({id: "42", title: "Discover meaning of life", body: ""})
			model.trigger("load", {id: 42, title: "Hello, world", body: ""})
			fixture.find("[name=title]").val("Discover meaning of life")
			Syn.click(fixture.find("[type=submit]"), resume)
		}})

		it("edits an existing item's body [-todo_editor_spec:4-]", function (resume) { with (this) {
			expect(model, "save").given({id: "64", title: "Rent", body: "BY FRIDAY"})
			model.trigger("load", {id: 64, title: "Rent", body: ""})
			fixture.find("[name=body]").val("BY FRIDAY")
			Syn.click(fixture.find("[type=submit]"), resume)
		}})

		it("creates a new item after editing [-todo_editor_spec:5-]", function (resume) { with (this) {
			expect(model, "save").given({id: "", title: "Deploy to Heroku", body: ""})
			model.trigger("load", {id: 64, title: "Rent", body: ""})
			Syn.click(fixture.find(".new-todo"), function () {
				fixture.find("[name=title]").val("Deploy to Heroku")
				Syn.click(fixture.find("[type=submit]"), resume)
			})
		}})
	}})
}
