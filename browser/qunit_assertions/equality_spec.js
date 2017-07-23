test("deep equality", function() {
  deepEqual( [1,2,3], [1,2,3] )
  notDeepEqual( [1,2,3], [1,2,3,4] )
  notDeepEqual( [1,5,3], [1,2,3] )
})

test("strict equality", function() {
  var array = [1,2,3]
  strictEqual( array, array )
  notStrictEqual( array, [1,2,3] )

  strictEqual( "123", "123" )
  notStrictEqual( 123, "123" )
})

test("equality", function() {
  equal( 123, "123" )
  notEqual( 42, "" )
})

