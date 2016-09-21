import test from 'tape'
import variants, { permutations } from '../src/lib/variants'


test('permutations - uses values for numbers', t => {
  t.deepEqual(permutations(1), [ [ 1 ] ])
  t.deepEqual(permutations(2), [ [ 1, 2 ], [ 2, 1 ] ])
  const ten = permutations(10)

  t.equal(ten.length, 6)
  t.deepEqual(ten[ 0 ], [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ])
  t.deepEqual(ten[ ten.length - 1 ], [ 3, 2, 1, 4, 5, 6, 7, 8, 9, 10 ])
  t.deepEqual(permutations(4)[0], [ 1, 2, 3, 4])
  t.end()
})


test('variants - works', t => {
  const a = () => ({})
  t.deepEqual(variants(1, a), [  
    { labels: [ '1', 'f' ], values: [ 1, a ] }, 
    { labels: [ 'f', '1' ], values: [ a, 1 ] } 
  ])
  t.deepEqual(variants(1), [ 
    { labels: [ '1' ], values: [ 1 ] } 
  ])
  t.deepEqual(variants(), [ 
    { labels: [ ], values: [ ] } 
  ])
  t.deepEqual(variants('x', 'y', 'z', 't'), [
    { labels: [ "'x'", "'y'", "'z'", "'t'" ], values: [ 'x', 'y', 'z', 't' ] }, 
    { labels: [ "'x'", "'z'", "'y'", "'t'" ], values: [ 'x', 'z', 'y', 't' ] }, 
    { labels: [ "'y'", "'x'", "'z'", "'t'" ], values: [ 'y', 'x', 'z', 't' ] }, 
    { labels: [ "'y'", "'z'", "'x'", "'t'" ], values: [ 'y', 'z', 'x', 't' ] }, 
    { labels: [ "'z'", "'x'", "'y'", "'t'" ], values: [ 'z', 'x', 'y', 't' ] }, 
    { labels: [ "'z'", "'y'", "'x'", "'t'" ], values: [ 'z', 'y', 'x', 't' ] }
   ])
  t.end()
})
