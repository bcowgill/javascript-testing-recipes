// This file defines framework reporter plugins that make each framework emit
// the jstest JSON report format described here:
//
//     http://jstest.jcoglan.com/json.html
//
// This output means the test results can be consumed by the phantom.js script
// in the examples root directory, allowing the tests to be run from the
// command line.


var reporters = {}


reporters.Jasmine = function() {
  this._json = new JS.Test.Reporters.JSON()
}

reporters.Jasmine.prototype.reportRunnerResults = function(runner) {
  var results = runner.results()
  this._json.endSuite({
    eventId:    0,
    timestamp:  new Date().getTime(),
    passed:     results.failedCount === 0,
    tests:      results.totalCount,
    assertions: results.totalCount,
    failures:   results.failedCount,
    errors:     0
  })
}


reporters.QUnit = function() {
  this._json = new JS.Test.Reporters.JSON()
}

reporters.QUnit.prototype.done = function(event) {
  this._json.endSuite({
    eventId:    0,
    timestamp:  new Date().getTime(),
    passed:     event.failed === 0,
    tests:      event.total,
    assertions: event.total,
    failures:   event.failed,
    errors:     0
  })
}

reporters.QUnit.prototype.asDoneCallback = function() {
  var self = this
  return function(event) { self.done(event) }
}

