var assert = require("assert")

assert.deepEqual( [1,2,3], [1,2,3] )
assert.notDeepEqual( [1,2,3], [1,2,3,4] )
assert.notDeepEqual( [1,5,3], [1,2,3] )

var array = [1,2,3]
assert.strictEqual( array, array )
assert.notStrictEqual( array, [1,2,3] )

assert.strictEqual( "123", "123" )
assert.notStrictEqual( 123, "123" )

assert.equal( 123, "123" )
assert.notEqual( 42, "" )

