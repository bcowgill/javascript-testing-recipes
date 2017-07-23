JS.Test.describe("TodoService load", function() { with(this) {
  before(function() { with(this) {
    this.service = new TodoService()
  }})

  it("asks the server for an item by ID", function() { with(this) {
    expect($, "ajax").given(objectIncluding({type: "GET", url: "/todos/101"}))
    service.load(101)
  }})

  describe("when the server returns an item", function() { with(this) {
    before(function() { with(this) {
      stub($, "ajax", function(options) {
        options.success.call(options.context, {id: 101, title: "Mow the lawn"})
      })
    }})

    it("yields the item to the caller", function(resume) { with(this) {
      service.load(101, function(error, item) {
        resume(function() {
          assertNull( error )
          assertEqual( {id: 101, title: "Mow the lawn"}, item )
        })
      })
    }})

    it("emits a 'load' event with the item", function(resume) { with(this) {
      expect(service, "trigger").given("load", {id: 101, title: "Mow the lawn"})
      service.load(101, resume)
    }})
  }})

  describe("when the request fails", function() { with(this) {
    before(function() { with(this) {
      stub($, "ajax", function(options) {
        options.error.call(options.context, {status: 404})
      })
    }})

    it("yields an error to the caller", function(resume) { with(this) {
      service.load(101, function(error, item) {
        resume(function() {
          assertEqual( "Item #101 not found", error.message )
          assertSame( undefined, item )
        })
      })
    }})

    it("does not emit a 'load' event", function(resume) { with(this) {
      expect(service, "trigger").given("load", anyArgs()).exactly(0)
      service.load(101, function() { resume() })
    }})
  }})
}})

