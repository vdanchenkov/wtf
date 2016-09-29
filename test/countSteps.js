import { countSteps } from '../src/lib'

test('countSteps', t => {
  t.equals(countSteps(Array(4), [ { args: [1], result: true }, { args: [2], result: false } ]), 24)
  t.end()
})
