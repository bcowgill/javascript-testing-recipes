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
 * [PhantomJS Headless (WebKit) Browser](http://phantomjs.org/)
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

## Modular Interfaces

 * [AngularJS Framework augmented HTML elements](http://angularjs.org/)
 * [EmberJS Framework](http://emberjs.com/)
 * [KnockoutJS MV-VM Framework](http://knockoutjs.com/)
 * [Meteor App Framework](https://www.meteor.com/)
 * [Facebook React Framework](http://facebook.github.io/react/)
 * [Rendr run Backbone app on client or server](https://www.npmjs.org/package/rendr)

## Talking to the Server

 * [Promises/A+ Specification](http://promisesaplus.com/)
 * [jQuery jqXHR object](http://api.jquery.com/jQuery.ajax/#jqXHR)
 * [XMLHttpRequest API reference](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
 * [sinon fakeServer API](http://sinonjs.org/#fakeServer)
 * [Socket.IO Library](http://socket.io/)

## Web Storage

 * [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage)
 * [IndexedDB API](https://developer.mozilla.org/en/docs/IndexedDB)

## URL Location Testing

 * [Browser Location API](https://developer.mozilla.org/en-US/docs/Web/API/Window.location)
 * [AJAX Crawling (deprecated)](https://developers.google.com/webmasters/ajax-crawling/docs/specification)
 * [Manipulating Browser History](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history)

## Build Tools

 * [CoffeeScript](http://coffeescript.org/)
 * [Grunt Task Runner](http://gruntjs.com/)
 * [GNU Make command](http://www.gnu.org/software/make/)
 * [Browserify module packager](http://browserify.org/)
 * [UglifyJS code minimiser/beautifier](https://npmjs.org/package/uglify-js)
 * [Building JS projects with Make](http://blog.jcoglan.com/2014/02/05/building-javascript-projects-with-make/)

## Cross-Browser Testing
 * [Jenkins self-hosted CI](http://jenkins-ci.org/)
 * [Travis open source hosted CI](https://travis-ci.org/)
 * [HtmlUnit GUI-less cross-browser simulator](http://htmlunit.sourceforge.net/)
 * [dead? EnvJS Pure Javascript browser](https://github.com/thatcher/env-js)
 * [dead? Harmony headless DOM+JS on ruby](https://github.com/mynyml/harmony)
 * [dying - TestSwarm jQuery's cross-browser testing](https://github.com/jquery/testswarm)
 * [inactive? - BusterJS cross-browser testing](http://busterjs.org/)
 * [Karma cross-browser test runner](http://karma-runner.github.io/)
 * [TestEm cross-browser/node test runner](https://www.npmjs.org/package/testem/)

## Basic Node Server Testing

 * [Apache HTTP Server](http://httpd.apache.org/)
 * [Nginx HTTP Server](http://nginx.org/)
 * [Node HTTP API](http://nodejs.org/api/http.html)
 * [JSClass Equality](http://jsclass.jcoglan.com/equality.html)

## Servers with Databases and Testing them

 * [Redis Database](http://redis.io/)
 * [Redis INCR command](http://redis.io/commands/incr)
 * [Redis SADD command](http://redis.io/commands/sadd)
 * [Redis ZRANGEBYSCORE command](http://redis.io/commands/zrangebyscore)

## Extracting Services from Server and Testing more efficiently

 * [Underscore Library](http://underscorejs.org/)

## Autentication and testing through browsers, real and simulated

 * [ORM Object-Relational Mapping](http://en.wikipedia.org/wiki/Object-relational_mapping)
 * [PBKDF2 Password Encryption](http://en.wikipedia.org/wiki/PBKDF2)
 * [Bcrypt Password Encryption](http://en.wikipedia.org/wiki/Bcrypt)
 * [Scrypt Password Encryption](http://en.wikipedia.org/wiki/Scrypt)
 * [CSRF Cross Site Resource Forgery Protection](http://en.wikipedia.org/wiki/Cross-site_request_forgery)
 * [Jade Template Lanuage](http://jadelang.net/)
 * [Same Origin Policy for JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Same_origin_policy_for_JavaScript)
 * [WebKit Open Source Web Browser Engine](http://www.webkit.org/)
 * [Chromium Blink fork from WebKit](http://www.chromium.org/blink)
 * [Slimer JS - A JavaScript Scriptable (Gecko) Browser for Developers](http://slimerjs.org/)
 * [Gecko Open Source Web Browser Engine](https://developer.mozilla.org/en-US/docs/Mozilla/Gecko)
 * [JSTest running with PhantomJS](http://jstest.jcoglan.com/phantom.html)
 * [Scripting for PhantomJS and SlimerJS](http://casperjs.org/)
 * [WebSocket Protocol (old, in phantomJS)](https://tools.ietf.org/html/draft-hixie-thewebsocketprotocol-76)
 * [WebSocket Protocol recent](https://tools.ietf.org/html/rfc6455)
 * [Selenium WebDriver](http://docs.seleniumhq.org/projects/webdriver/)
 * [Node API for WebDriver](https://www.npmjs.org/package/wd)
 * [NightWatch Browser Automated Testign against WebDriver](http://nightwatchjs.org/)
 * [Testium Web Testing with PhantomJS or Selenium](https://www.npmjs.org/package/testium)
 * [Fast Headless Full Stack testing in Node.js](http://zombie.labnotes.org/)

## 

 * []()
 * []()
