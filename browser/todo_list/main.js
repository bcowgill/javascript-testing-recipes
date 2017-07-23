(function() {
  var model   = new TodoModel(),
      editor  = new TodoEditor(".todo-form", model),
      display = new TodoDisplay(".todo-list", model)
})()

