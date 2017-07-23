var InteractiveValidator = function(form, validator) {
  this._form      = $(form)
  this._validator = validator

  var self = this

  this._form.find("input").each(function(index, input) {
    if (input.name) self.validateInput(input)
  })
}

InteractiveValidator.prototype.validateInput = function(input) {
  var name = input.name, self = this

  $(input).on("keyup", function() {
    var data = self.getData(), errors = self._validator(data)
    if (!errors[name]) return
    self._form.find(".error-" + name).remove()
    $(input).parents("p")
        .after('<p class="error error-' + name + '">' + errors[name] + '</p>')
  })
}

InteractiveValidator.prototype.getData = function() {
  var array = this._form.serializeArray(), params = {}

  for (var i = 0, n = array.length; i < n; i++) {
    params[array[i].name] = array[i].value
  }
  return params
}
