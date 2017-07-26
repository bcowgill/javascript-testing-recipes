#!/usr/bin/env node
/*
	$ node ./server.js &
	$ curl -X GET http://localhost:8000/meaning_of_life
	Not found
	$ curl -X PUT http://localhost:8000/meaning_of_life -d "value=42"
	Created
	$ curl -X PUT http://localhost:8000/bright_side -d "value=nothing"
	Created
	$ curl -X GET http://localhost:8000/meaning_of_life
	42
	$ curl -X GET http://localhost:8000/bright_side
	nothing
	$ curl -X GET http://localhost:8000/
	meaning_of_life
	bright_side
	$ curl -X DELETE http://localhost:8000/meaning_of_life
	OK
	$ curl -X GET http://localhost:8000/
	bright_side
	$ curl -X DELETE http://localhost:8000/
	OK
	$ curl -X GET http://localhost:8000/bright_side
	Not found
*/

var server = require('./server_steps')
var port = process.env.PORT || 8000

server.startServer(port, function () {
	console.info("started server on port " + port);
})
