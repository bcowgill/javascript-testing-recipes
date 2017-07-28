JavaScript Testing Recipes
==========================

This directory contains the code examples for [JavaScript Testing
Recipes](http://jstesting.jcoglan.com). Everything you need to run the examples
is here, including all third-party libraries. All the examples should run
successfully out of the box.

The examples from the book are in the `browser/` and `node/` directories. Within
those directories, any file named `test.html` can be opened in a web browser and
it will run the tests for that example. Similarly, any file named `test.js` can
be run with Node.js.

You can also run any of the browser examples using PhantomJS, using this
command, replacing `hello_world` with the name of the example you want to run:

    $ phantomjs phantom.js browser/hello_world/test.html

The `node_modules/` and `vendor/` directories contain third-party libraries, and
`package.json` contains project meatadata that's used to install all the
dependencies the examples rely on. You should not need to modify any of these
files.

You can use `test-phantom.sh` to run all the browser tests using phantomjs.

You can use `test-node.sh` to run all the node tests using nodejs.

You can change the test output format using FORMAT= variable (spec, xml, html, json etc)

```bash
FORMAT=spec ./test-node.sh
FORMAT=spec ./test-phantom.sh
```

You can run specific tests which match a string.

```bash
TEST=PatternMatcher ./test-node.sh  # only runs it/describe suites with PatternMatcher in their descriptive string.
TEST=_only_ ./test-node.sh  # simulate it.only or describe.only by adding _only_ to the test name
```

You can construct `index.html` for running the tests in browser:

```bash
find browser/ -name '*.html' | sort | perl -pne '
   BEGIN {print "<html>\n<head>\n<title>Browser Based Test Plans</title>\n<style>\nbody {\nbackground: black;\ncolor: yellow;\n}\n</style>\n</head>\n<body>\n<h4>Browser Based Test Plans</h4>\n<ul>\n"; }
   END { print "</ul>\n</body>\n</html>\n"; }
   chomp;
   m{browser/(.+)/(.+)\.html}xms;
   $name = $1;
   $type = $2;
   $type = ($type eq "test") ? "test suite": "$type page";
   $_ = qq{<li><a href="$_">$name $type</a></li>\n}
' > index.html
```

# URL references from the book:

## Introduction

 * [AsciiDoc text based document generation](http://www.methods.co.nz/asciidoc/#_introduction)
 * [DocBook Project publish to HTML, pdf, or e-book formats](http://docbook.sourceforge.net/)
 * [Pygments syntax highlighter](http://pygments.org/)
 * [XSLT processor tool](http://xmlsoft.org/XSLT/xsltproc2.html)
 * [Apache Formatting Objects Processor](https://xmlgraphics.apache.org/fop/)
 * [PhantomJS headless browser](http://phantomjs.org/)
 * [NodeJS](https://nodejs.org/en/)

## Testing Frameworks

 * [Test Anything Protocol](http://testanything.org/)
 * [Jasmine framework](http://jasmine.github.io/)
 * [QUnit framework](http://qunitjs.com/)
 * [Mocha framework](https://mochajs.org/)
 * [jstest framework](http://jstest.jcoglan.com/)

## Testing Basics

 * [Nodejs assert API](http://nodejs.org/api/assert.html)
 * [Jasmine matcher API](http://jasmine.github.io/1.3/introduction.html#section-Included_Matchers)
 * [Chai API](http://chaijs.com/)
 * [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
 * [jstest assertion API](http://jstest.jcoglan.com/assertions.html)

## After Blocks

 * [DRY principle](http://en.wikipedia.org/wiki/Don't_repeat_yourself)

## Stub, Mock and Spy

 * [Synthetic Events - Simulate Web User actions](https://github.com/bitovi/syn)
 * [jstest stub and mock API](http://jstest.jcoglan.com/mocking.html)
 * [Sinon stub mock and spy API](http://sinonjs.org/)

## Asyncronous Testing

 * [jstest async test API](http://jstest.jcoglan.com/async.html)
 * [node Express app server](http://expressjs.com/)
 * [node Request simple way to make http requests](https://npmjs.org/package/request)
 * [async module to simplify asynchronous javascript](https://npmjs.org/package/async)

## Event Emission Testing

 * [jQuery library](http://jquery.com/)
 * [Node Stream Event API](http://nodejs.org/api/stream.html)
 * [Node EventEmitter API](http://nodejs.org/api/events.html)
 * [Backbone UI Model-View Framework](http://backbonejs.org/)

## Event Listening Testing

 * [Selenium Automated Browser Testing](http://www.seleniumhq.org/)

## Node Stream Testing

 * [Stream Guide James Halliday](https://github.com/substack/stream-handbook)
 * [Node Stream Splitter](https://npmjs.org/package/split)
 * [Node Websocket Stream Module](https://npmjs.org/package/websocket-driver)
 * [Node Concatenate Stream](https://npmjs.org/package/concat-stream)
 * [Node Read and Write Stream](https://npmjs.org/package/through)
 * [Node Map Stream through async function](https://npmjs.org/package/map-stream)
 * [Dominic Tarr many node stream modules author](https://github.com/dominictarr)
 * [Node Stream Composition](https://npmjs.org/package/stream-combiner)

## Form Validation

 * [Progressive Enhancement](http://alistapart.com/article/understandingprogressiveenhancement)
 * [jstest Browser Testing](http://jstest.jcoglan.com/browser.html)
 * [Handlebars Template Library](http://handlebarsjs.com/)

##

 * []()
 * []()
