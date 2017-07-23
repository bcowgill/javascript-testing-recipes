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

You can construct `index.html` for running the tests in browser:

```bash
find browser/ -name test.html | sort | perl -pne '
   BEGIN {print "<ul>\n"; }
   END { print "</ul>\n"; }
   chomp;
   m{browser/(.+)/test\.html}xms;
   $name = $1;
   $_ = qq{<li><a href="$_">$name test suite</a></li>\n}
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

