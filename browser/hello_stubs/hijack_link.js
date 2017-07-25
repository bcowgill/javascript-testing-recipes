var hijackLink = function (selector, target) {
  $(selector).on("click", function () {
    var url = $(this).attr("href")
    $.get(url, function (response) {
      $(target).html(response)
    })
    return false
  })
}

