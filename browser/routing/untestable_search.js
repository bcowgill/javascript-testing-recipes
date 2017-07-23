var search = function(query) {
  $.get("/search", {q: query}, function(response) {
    location.href = response.url
  })
}


