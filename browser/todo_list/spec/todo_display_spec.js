JS.Test.describe("TodoDisplay", function() { with(this) {
  extend(HtmlFixture)

  fixture(' <table class="todo-list"> \
              <thead> \
                <tr> \
                  <th scope="col">Title</th> \
                  <th scope="col">Actions</th> \
                </tr> \
              </thead> \
              <tbody></tbody> \
            </table> ')

  before(function() { with(this) {
    this.model   = _.clone(Backbone.Events)
    this.display = new TodoDisplay(fixture.find(".todo-list"), model)

    model.trigger("create", {id: 37, title: "Pay rent"})
  }})

  it("displays the item", function() { with(this) {
    var titles = $.map(fixture.find("a"), function(a) { return $(a).text() })
    assertEqual( ["Pay rent"], titles )
  }})

  it("updates the item", function() { with(this) {
    model.trigger("update", {id: 37, title: "Submit tax return"})
    var titles = $.map(fixture.find("a"), function(a) { return $(a).text() })
    assertEqual( ["Submit tax return"], titles )
  }})

  it("loads an item when clicked", function(resume) { with(this) {
    expect(model, "load").given(37)
    Syn.click(fixture.find("tbody a"), resume)
  }})

  it("tells the model to remove an item", function(resume) { with(this) {
    expect(model, "remove").given(37)
    Syn.click(fixture.find("tbody .delete-form [type=submit]"), resume)
  }})

  it("removes a deleted item from view", function() { with(this) {
    model.trigger("remove", {id: 37})
    var titles = $.map(fixture.find("a"), function(a) { return $(a).text() })
    assertEqual( [], titles )
  }})
}})

