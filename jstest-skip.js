// Setups for adding mocha like skip functionality to jstest runner.
// Brent S.A. Cowgill
// skip.it() - a skip function to help with it.only simulation
// describe.skip() - a skip function to disable an entire suite of tests
// it.skip() - a test marked as skip, if you've called addSkip(this) in the describe suite

// it.only didn't work out. solution use perl to mark all tests as skip.it
// then remove the skip. on only the test to run:
// perl -i.bak -pne 's{\b i t (\s* \()}{skip.it$1}xmsg' ...
// perl -i.bak -pne 's{\b skip\.i t (\s* \()}{it$1}xmsg' ...
// or number-tests.pl --mark-skip file...
// number-tests.pl --unmark-skip file...

/*
	Example usage:

	with (JS.Test) {
		describe("Hello, world!", function () { with (this) { addSkip(this)
			it("runs a test", function () { with (this) {
				assertEqual( "Hello, world!", ["Hello", "world!"].join(", ") )
			}})
			it("a pending test, no function yet") // jstest will not run this, nor tell you it even exists
			it.skip("skip a pending test, no function yet") // will show in console.info
			it.skip("skip a test", function () { with (this) {
				assertEqual( "Hello, world!", ["Hello", "world!"].join(", ") )
			}})
			skip.it("also skip a test but meant to help with it.only", function () { with (this) {
				assertEqual( "Hello, world!", ["Hello", "world!"].join(", ") )
			}})
		}})
	}
*/

if (typeof JS === 'undefined')
{
	JS = require('jstest')
}
if (typeof JS.Test.skip !== 'undefined' || typeof JS.Test.addSkip !== 'undefined' || typeof JS.Test.describe.skip !== 'undefined')
{
	console.warn('JS.Test.skip, JS.Test.addSkip or JS.Test.describe.skip already exists, could be a problem.')
}
else
{
	console.info('installing JS.Test.skip, JS.Test.addSkip and JS.Test.describe.skip support to jstest runner.')
}

JS.Test.skip = JS.Test.skip || function (description, fn) {
	console.info('skip test: ' + description, fn)
}
// call within each describe block to support it.skip()
JS.Test.addSkip = function (suite) {
	// console.log('addSkip suite', suite)
	suite.it.skip = JS.Test.skip
}

with (JS.Test) {
	skip.it = skip
	skip.describe = function (description, fn) {
		console.info('skip suite: ' + description)
	}
	describe.skip = skip.describe
}

if (typeof module === "object") {
	module.exports = JS
}

