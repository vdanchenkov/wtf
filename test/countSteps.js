import { countSteps } from '../src/lib'

test('countSteps', t => {
  t.equals(countSteps(Array(4), [ { args: [1], result: true }, { args: [2], result: false } ]), 4)
  t.equals(countSteps(Array(4), [ { args: [1, 2], result: true }, { args: [2], result: false } ]), 4)
  t.equals(countSteps(Array(4), [ { args: [1, 2], result: true }, { args: [2, 3], result: false } ]), 8)
  t.end()
})
