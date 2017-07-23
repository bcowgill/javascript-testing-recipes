var TodoDisplay = function(selector, model) {
  TodoList.apply(this, arguments)
  this._model = model

  var self = this

  this._model.on("create", function(item) {
    var row = self.renderItem(item)
    self._rows[item.id] = row
    self._element.find("tbody").append(row)
  })

  this._model.on("update", function(item) {
    self._rows[item.id].find("a").text(item.title)
  })

  this._model.on("remove", function(item) {
    self._rows[item.id].remove()
    delete self._rows[item.id]
  })
}
util.inherits(TodoDisplay, TodoList)

TodoDisplay.prototype.loadItem = function(itemId) {
  this._model.load(itemId)
}

TodoDisplay.prototype.removeItem = function(itemId) {
  this._model.remove(itemId)
}

