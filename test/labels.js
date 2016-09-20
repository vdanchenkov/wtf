import test from 'tape'
import labels from '../src/lib/labels'

test('uses values for numbers', t => {
  t.deepEqual(labels(1, 2, 3), [ '1', '2', '3' ])
  t.end()
})

test('uses values for strings', t => {
  t.deepEqual(labels('a', 'b'), [ "'a'", "'b'" ])
  t.end()
})

test('uses arr label for single array', t => {
  t.deepEqual(labels([ 1, 2, 3 ]), [ 'arr' ])
  t.end()
})

test('uses arr(n) label for multiple arrays', t => {
  t.deepEqual(labels([ 1, 2, 3 ], [ 4 ]), [ 'arr1', 'arr2' ])
  t.end()
})

test('uses f label for single function', t => {
  t.deepEqual(labels(() => ({})), [ 'f' ])
  t.end()
})

test('uses f(n) label for multiple functions', t => {
  t.deepEqual(labels(() => ({}), () => ({})), [ 'f1', 'f2' ])
  t.end()
})
