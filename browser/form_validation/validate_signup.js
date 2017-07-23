var validateSignup = function(data) {
  var errors = {}

  if (!data.email.match(/^[a-z]+@[a-z]+\.com$/)) {
    errors.email = "Email address is not valid"
  }
  if (data.password.length < 8) {
    errors.password = "Password is too short"
  }

  return errors
}

