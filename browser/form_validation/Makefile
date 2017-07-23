export PATH := ../../node_modules/.bin:$(PATH)

template_js     := templates/templates.js
template_source := templates/*.handlebars

.PHONY: all test

all: $(template_js)

test: all
	phantomjs ../../phantom.js test.html

$(template_js): $(template_source)
	handlebars $(template_source) > $(template_js)

