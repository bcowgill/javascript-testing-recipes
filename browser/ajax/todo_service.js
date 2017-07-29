var TodoService = function() {}
_.extend(TodoService.prototype, Backbone.Events)

TodoService.prototype.load = function(id, callback) {
  $.ajax({
    type: "GET", url: "/todos/" + id, context: this,

    success: function(response) {
      this.trigger("load", response)
      callback(null, response)
    },
    error: function() {
      callback(new Error("Item #" + id + " not found"))
    }
  })
}

TodoService.prototype.save = function(item, callback) {
  var self = this

  if (item.id) {
    $.ajax({type: "PUT", url: "/todos/" + item.id, data: item}).then(function(response) {
      self.trigger("update", response)
      callback(null, response)
    }, function(error) {
      callback(new Error(error.responseJSON.error))
    })
  } else {
    $.post("/todos/", item, function(response) {
      item.id = response.id
      self.trigger("create", item)
      callback(null, item)
    }, function(error) {
      callback(new Error(error.responseJSON.error))
    })
  }
}

TodoService.prototype.remove = function(id, callback) {
  $.ajax({type: "DELETE", url: "/todos/" + id, context: this}).then(function(response) {
    this.trigger("remove", response)
    callback(null, response)
  }, function() {
    callback(new Error("Item #" + id + " not found"))
  })
}

