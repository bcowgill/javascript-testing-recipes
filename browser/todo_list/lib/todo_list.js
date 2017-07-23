var TodoList = function(selector) {
  this._element = $(selector)
  this._itemId  = 0
  this._items   = {}
  this._rows    = {}
}

TodoList.prototype.saveItem = function(item) {
  item.id = item.id || ++this._itemId

  var itemHtml = this._rows[item.id]
  if (!itemHtml) {
    itemHtml = this._rows[item.id] = this.renderItem(item)
  }
  this._items[item.id] = item
  itemHtml.find(".todo-title a").text(item.title)
}

TodoList.prototype.renderItem = function(item) {
  var itemHtml = $(Handlebars.templates.todo_item(item)), self = this
  this._element.find("tbody").append(itemHtml)

  itemHtml.find("a").on("click", function(event) {
    event.preventDefault()
    self.loadItem(item.id)
  })

  itemHtml.find(".delete-form").on("submit", function(event) {
    event.preventDefault()
    self.removeItem(item.id)
  })

  return itemHtml
}

TodoList.prototype.loadItem = function(itemId) {
  App.todoForm.loadItem(this._items[itemId])
}

TodoList.prototype.removeItem = function(itemId) {
  this._rows[itemId].remove()
}

