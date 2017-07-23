var FORM_HTML = ' <div class="todo-form"> \
  <p><a class="new-todo" href="/todos/new">Create item</a></p> \
  <form method="post" action="/todos"> \
    <input type="hidden" name="id"> \
    <p> \
      <label for="todo-title">Title</label> \
      <input type="text" name="title" id="todo-title"> \
    </p> \
    <p> \
      <label for="todo-body">Body</label><br> \
      <textarea name="body" id="todo-body"></textarea> \
    </p> \
    <input type="submit" value="Save"> \
  </form> \
</div> '

