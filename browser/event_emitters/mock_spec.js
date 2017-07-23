JS.Test.describe("jQuery events (mock)", function() { with(this) {
  extend(HtmlFixture)

  fixture(" <p></p> <p></p> <p></p> ")

  before(function() { with(this) {
    this.paras  = fixture.find("p")
    this.second = paras.get(1)
  }})

  it("invokes callback with 'this' bound to the element", function(resume) { with(this) {
    expect(this, "callback")
        .on(second)
        .given(objectIncluding({target: second, type: "click"}))
        .exactly(1)

    paras.on("click", callback)
    Syn.click(second, resume)
  }})
}})

