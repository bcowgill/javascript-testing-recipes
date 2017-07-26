with (JS.Test) {
	describe("TodoModel [-todo_model_spec:0-]", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.model = new TodoModel()
		}})

		describe("save() [-todo_model_spec:1-]", function () { with (this) { addSkip(this)
			it("assigns a sequential ID to new items [-todo_model_spec:2-]", function () { with (this) {
				var items = [{title: "Make breakfast"}, {title: "Wash up"}]
				model.save(items[0])
				assertEqual( 1, items[0].id )
				model.save(items[1])
				assertEqual( 2, items[1].id )
			}})

			it("does not change the ID of existing items [-todo_model_spec:3-]", function () { with (this) {
				var item = {id: 42, title: "Discover meaning of life"}
				model.save(item)
				assertEqual( 42, item.id )
			}})

			it("emits a 'create' event for new items [-todo_model_spec:4-]", function () { with (this) {
				expect(model, "trigger").given("create", {id: 1, title: "Renew passport"})
				model.save({title: "Renew passport"})
			}})

			it("emits an 'update' event for existing items [-todo_model_spec:5-]", function () { with (this) {
				expect(model, "trigger").given("update", {id: 1, title: "Renew passport"})
				model.save({id: 1, title: "Renew passport"})
			}})
		}})

		describe("load() [-todo_model_spec:6-]", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				model.save({title: "Make breakfast"})
			}})

			it("emits a 'load' event with the data for the ID [-todo_model_spec:7-]", function () { with (this) {
				expect(model, "trigger").given("load", {id: 1, title: "Make breakfast"})
				model.load(1)
			}})
		}})

		describe("remove() [-todo_model_spec:8-]", function () { with (this) { addSkip(this)
			before(function () { with (this) {
				model.save({title: "Make breakfast"})
			}})

			it("emits a 'remove' event with the data for the ID [-todo_model_spec:9-]", function () { with (this) {
				expect(model, "trigger").given("remove", {id: 1, title: "Make breakfast"})
				model.remove(1)
			}})

			it("deletes the item from the collection [-todo_model_spec:10-]", function () { with (this) {
				model.remove(1)
				expect(model, "trigger").given("load", anyArgs()).exactly(0)
				model.load(1)
			}})
		}})
	}})
}
