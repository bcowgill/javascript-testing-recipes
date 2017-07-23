JS.Test.describe("TodoModel", function() { with(this) {
  before(function() { with(this) {
    this.model = new TodoModel()
  }})

  describe("save()", function() { with(this) {
    it("assigns a sequential ID to new items", function() { with(this) {
      var items = [{title: "Make breakfast"}, {title: "Wash up"}]
      model.save(items[0])
      assertEqual( 1, items[0].id )
      model.save(items[1])
      assertEqual( 2, items[1].id )
    }})

    it("does not change the ID of existing items", function() { with(this) {
      var item = {id: 42, title: "Discover meaning of life"}
      model.save(item)
      assertEqual( 42, item.id )
    }})

    it("emits a 'create' event for new items", function() { with(this) {
      expect(model, "trigger").given("create", {id: 1, title: "Renew passport"})
      model.save({title: "Renew passport"})
    }})

    it("emits an 'update' event for existing items", function() { with(this) {
      expect(model, "trigger").given("update", {id: 1, title: "Renew passport"})
      model.save({id: 1, title: "Renew passport"})
    }})
  }})

  describe("load()", function() { with(this) {
    before(function() { with(this) {
      model.save({title: "Make breakfast"})
    }})

    it("emits a 'load' event with the data for the ID", function() { with(this) {
      expect(model, "trigger").given("load", {id: 1, title: "Make breakfast"})
      model.load(1)
    }})
  }})

  describe("remove()", function() { with(this) {
    before(function() { with(this) {
      model.save({title: "Make breakfast"})
    }})

    it("emits a 'remove' event with the data for the ID", function() { with(this) {
      expect(model, "trigger").given("remove", {id: 1, title: "Make breakfast"})
      model.remove(1)
    }})

    it("deletes the item from the collection", function() { with(this) {
      model.remove(1)
      expect(model, "trigger").given("load", anyArgs()).exactly(0)
      model.load(1)
    }})
  }})
}})

