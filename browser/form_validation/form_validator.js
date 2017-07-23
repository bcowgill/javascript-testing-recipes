var FormValidator = function(form, validator) {
  this._form      = $(form)
  this._validator = validator

  var self = this

  this._form.on("submit", function(event) {
    event.preventDefault()
    self.handleSubmit()
  })
}

FormValidator.prototype.handleSubmit = function() {
  var data = this.getData(), errors = this._validator(data)

  this._form.find(".error").remove()
  this.displayErrors(errors)

  if (this._form.find(".error").length === 0) {
    this.submit()
  }
}

FormValidator.prototype.getData = function() {
  var array = this._form.serializeArray(), params = {}

  for (var i = 0, n = array.length; i < n; i++) {
    params[array[i].name] = array[i].value
  }
  return params
}

FormValidator.prototype.displayErrors = function(errors) {
  for (var key in errors) {
    this._form.find("[name=" + key + "]")
              .parents("p")
              .after('<p class="error">' + errors[key] + '</p>')
  }
}

FormValidator.prototype.submit = function() {
  this._form.get(0).submit()
}

