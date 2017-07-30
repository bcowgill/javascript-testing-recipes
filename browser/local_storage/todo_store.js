var TodoStore = function() {
  var itemId = localStorage.itemId
  if (!itemId) localStorage.itemId = "0"
}
_.extend(TodoStore.prototype, Backbone.Events)

TodoStore.prototype.save = function(item) {
  var itemId = parseInt(localStorage.itemId, 10)
  if (item.id) {
    this.trigger("update", item)
  } else {
    item.id = ++itemId
    localStorage.itemId = itemId.toString()
    this.trigger("create", item)
  }
  localStorage["items:" + item.id] = JSON.stringify(item)
}

TodoStore.prototype.load = function(id) {
  var item = localStorage["items:" + id]
  if (item) this.trigger("load", JSON.parse(item))
}

TodoStore.prototype.remove = function(id) {
  var item = localStorage.getItem("items:" + id)
  if (item) {
    this.trigger("remove", JSON.parse(item))
    localStorage.removeItem("items:" + id)
  }
}

