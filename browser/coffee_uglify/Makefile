export PATH := ../../node_modules/.bin:$(PATH)

source_files    := $(wildcard lib/*.coffee)
build_files     := $(patsubst lib/%.coffee,build/lib/%.js,$(source_files))
template_source := templates/*.handlebars
template_js     := build/templates.js
app_bundle      := build/app.js
spec_coffee     := $(wildcard spec/*.coffee)
spec_js         := $(patsubst spec/%.coffee,build/spec/%.js,$(spec_coffee))

.PHONY: all clean test

all: $(app_bundle)

build/%.js: %.coffee
	coffee -co $(dir $@) $<

$(template_js): $(template_source)
	mkdir -p $(dir $@)
	handlebars $^ > $@

$(app_bundle): $(build_files) $(template_js)
	uglifyjs -cmo $@ $^

test: all $(spec_js)
	phantomjs ../../phantom.js test.html

clean:
	rm -rf build

