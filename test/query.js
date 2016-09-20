import test from "tape"

import query from '../src/lib/query'

test.skip('simple query', (t) => {
  const result = query(wtf => wtf(1).isEqual(1))
  t.equal(result.length, 1)
  t.deepEqual(result[0], { combinations: [], result: 1 }) 
  t.end()
})
