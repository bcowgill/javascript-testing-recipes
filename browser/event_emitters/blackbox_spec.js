JS.Test.describe("jQuery events (black-box)", function() { with(this) {
  extend(HtmlFixture)

  fixture(" <p></p> <p></p> <p></p> ")

  before(function() { with(this) {
    this.paras  = fixture.find("p")
    this.second = paras.get(1)
  }})

  it("invokes callback with 'this' bound to the element", function(resume) { with(this) {
    var receiver, event

    paras.on("click", function(e) {
      receiver = this
      event    = e
    })

    Syn.click(second, function() {
      resume(function() {
        assertSame( second, receiver )
        assertEqual( objectIncluding({target: second, type: "click"}), event )
      })
    })
  }})
}})

