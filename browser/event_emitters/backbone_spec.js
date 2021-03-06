with (JS.Test) {
	describe("Backbone.Model (mock) [-backbone_spec:0-]", function () { with (this) { addSkip(this)
		var Person = Backbone.Model.extend({
			toString: function () {
				return "Person{" + this.get("name") + "}"
			}
		})

		before(function () { with (this) {
			this.person = new Person({name: "Alice"})
		}})

		it("emits events when attributes change [-backbone_spec:1-]", function () { with (this) {
			expect(person, "trigger").given("change:name", person, "Merlin", {})
			expect(person, "trigger").given("change:occupation", person, "ceramicist", {})
			expect(person, "trigger").given("change", person, {})

			person.set({name: "Merlin", occupation: "ceramicist"})
		}})
	}})
}
