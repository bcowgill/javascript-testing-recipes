var TodoModel = function() {
  this._items  = {}
  this._itemId = 0
}
_.extend(TodoModel.prototype, Backbone.Events)

TodoModel.prototype.save = function(item) {
  var event = item.id ? "update" : "create"
  if (!item.id) {
    item.id = ++this._itemId
  }
  this._items[item.id] = item
  this.trigger(event, item)
}

TodoModel.prototype.load = function(id) {
  var item = this._items[id]
  if (item) this.trigger("load", item)
}

TodoModel.prototype.remove = function(id) {
  var item = this._items[id]
  delete this._items[id]
  if (item) this.trigger("remove", item)
}

