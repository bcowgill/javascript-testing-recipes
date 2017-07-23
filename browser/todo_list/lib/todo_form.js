var TodoForm = function(selector) {
  this._element = $(selector)
  this.loadItem({})

  var form      = this._element.find("form"),
      validator = new FormValidator(form, this.validateItem),
      self      = this

  this._element.find(".new-todo").on("click", function(event) {
    event.preventDefault()
    self.loadItem({})
  })

  validator.submit = function() {
    $.extend(self._todo, validator.getData())
    self.saveItem()
  }
}

TodoForm.prototype.loadItem = function(item) {
  this._todo = item
  var self = this

  $.each(["id", "title", "body"], function(i, field) {
    self._element.find("[name=" + field + "]").val(item[field] || "")
  })
}

TodoForm.prototype.validateItem = function(item) {
  var errors = {}
  if (!item.title) errors.title = "Title cannot be blank"
  return errors
}

TodoForm.prototype.saveItem = function() {
  App.todoList.saveItem(this._todo)
  this._element.find("[name=id]").val(this._todo.id)
}

