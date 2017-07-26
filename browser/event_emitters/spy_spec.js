with (JS.Test) {
	describe("Backbone.Model (spy) [-spy_spec:0-]", function () { with (this) { addSkip(this)
		var Person = Backbone.Model.extend({
			toString: function () {
				return "Person{" + this.get("name") + "}"
			}
		})

		before(function () { with (this) {
			this.person = new Person({name: "Alice"})
		}})

		it("emits events when attributes change [-spy_spec:1-]", function () { with (this) {
			var trigger = sinon.spy(person, "trigger")
			person.set({name: "Merlin", occupation: "ceramicist"})
			sinon.assert.calledWithExactly(trigger, "change:name", person, "Merlin", {})
		}})
	}})
}
