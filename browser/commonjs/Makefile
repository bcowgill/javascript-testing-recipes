export PATH := ../../node_modules/.bin:$(PATH)

app_bundle      := app.js
lib_files       := lib/*.js
template_js     := templates/templates.js
template_source := templates/*.handlebars
spec_files      := spec/*.js
test_bundle     := test.js

.PHONY: all test

all: $(app_bundle)

$(app_bundle): $(lib_files) $(template_js)
	browserify lib/main.js > $@

$(template_js): $(template_source)
	handlebars -c handlebars $^ > $@

test: $(test_bundle)
	phantomjs ../../phantom.js test.html

$(test_bundle): $(lib_files) $(template_js) $(spec_files)
	browserify spec/main.js --noparse jstest > $@

