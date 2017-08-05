module.exports = function(response, errors) {
    response.json(409, {errors: errors})
}

