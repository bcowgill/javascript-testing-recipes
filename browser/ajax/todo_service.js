/*

CRUD    REST       Service      SQL
create  POST       save(no id)  INSERT INTO table (fields) VALUES (values)
read    GET        load(id)     SELECT fields FROM table WHERE condition ...
update  PUT/PATCH  save(w/id)   UPDATE table SET field=value WHERE condition
delete  DELETE     remove(id)   DELETE FROM table WHERE condition

	debugging ajax calls in the browser, use a log function
	log = function (msg) { return function (resp) { console.log(msg, JSON.stringify(resp)) } }
	> $.ajax({type: "GET", url: "/todos/1", success: log("ITEM"), error: log("ERROR")})
	ITEM {"id":1,"title":"Mow the lawn"}
	> $.ajax({type: "GET", url: "/todos/2", success: log("ITEM"), error: log("ERROR")})
	ERROR {"readyState":4,"responseText":"{\"error\":\"Item not found\"}", ...
	       "responseJSON":{"error":"Item not found"},"status":404,"statusText":"Not Found"}

	debugging ajax with promises
	> response = $.ajax({type: "PUT", url: "/todos/1", data: {title: "Mow the lawn"}})
	> response.then(log("ITEM"), log("ERROR"))
	ITEM {"id":1,"title":"Mow the lawn"}

*/

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
    // $.post has no error handling support
    $.post("/todos/", item, function(response) {
      item.id = response.id
      self.trigger("create", item)
      callback(null, item)
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

