import { variant } from '../src/lib'


test('variant - 2 arguments', t => {
  t.deepEqual(variant(0, [ 'a', 'b' ]), [ 'a', 'b' ])
  t.deepEqual(variant(1, [ 'a', 'b' ]), [ 'b', 'a' ])
  t.end()
})

test('variant - 10 arguments', t => {
  const src = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
  t.deepEqual(variant(0, src), [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ])
  t.deepEqual(variant(5, src), [ 3, 2, 1, 4, 5, 6, 7, 8, 9, 10 ])
  t.end()
})

test('variant - 3 arguments - emits 6 different variants in specific order', t => {
  const src = [ 'a', 'b', 'c' ]
  const check = (i, result) => {
    t.equal(variant(i, src).join(''), result)
  }
  check(0, 'abc')
  check(1, 'bac')
  check(2, 'acb')
  check(3, 'bca')
  check(4, 'cab')
  check(5, 'cba')
  t.end()
})
