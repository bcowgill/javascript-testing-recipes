var TodoEditor = function(selector, model) {
  TodoForm.apply(this, arguments)
  this._model = model

  var self = this

  this._model.on("load", function(item) {
    self.loadItem(item)
  })
}
util.inherits(TodoEditor, TodoForm)

TodoEditor.prototype.saveItem = function(item) {
  this._model.save(this._todo)
  this._element.find("[name=id]").val(this._todo.id)
}

