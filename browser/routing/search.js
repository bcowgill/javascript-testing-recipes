var search = function(query) {
  $.get("/search", {q: query}, function(response) {
    redirect(response.url)
  })
}

