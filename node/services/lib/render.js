module.exports = function(response, error, status, data) {
  if (error) {
    response.json(500, {errors: [error.message]})
  } else {
    response.json(status, data)
  }
}

