var validateForm = function(selector) {
  $(selector).on("submit", function(event) {
    var form     = $(this),
        email    = form.find("[name=email]"),
        password = form.find("[name=password]")

    form.find(".error").remove()

    if (!email.val().match(/^[a-z]+@[a-z]+\.com$/)) {
      email.parents("p").after('<p class="error">Email address is not valid</p>')
    }
    if (password.val().length < 8) {
      password.parents("p").after('<p class="error">Password is too short</p>')
    }

    if (form.find(".error").length > 0) {
      event.preventDefault()
    }
  })
}

