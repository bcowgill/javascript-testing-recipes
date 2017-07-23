JS.Test.describe("TodoService.save() new", function() { with(this) {
  before(function() { with(this) {
    this.service = new TodoService()
  }})

  it("sends the item to the server", function() { with(this) {
    expect($, "post").given("/todos", {title: "Take out the garbage"}, instanceOf(Function))
    service.save({title: "Take out the garbage"})
  }})

  describe("when the request succeeds", function() { with(this) {
    before(function() { with(this) {
      stub($, "post").yields([{id: 29}])
    }})

    it("yields the new ID to the caller", function(resume) { with(this) {
      service.save({}, function(error, response) {
        resume(function() {
          assertNull( error )
          assertEqual( {id: 29}, response )
        })
      })
    }})

    it("emits a 'create' event with the complete item", function(resume) { with(this) {
      expect(service, "trigger").given("create", {id: 29, title: "Publish a book"})
      service.save({title: "Publish a book"}, resume)
    }})
  }})
}})

