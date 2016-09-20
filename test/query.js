import test from "tape"

import query from '../src/lib/query'

test('simple query', (t) => {
  const result = query(wtf => wtf(1).isEqual(1))
  t.deepEqual(result, [ 
    { argumentVariants: [ 
      { argumentLabels: [ '1' ], argumentValues: [ 1 ] } 
    ], expectation: 1 } 
  ]) 
  t.end()
})

test('two queries', (t) => {
  const result = query(wtf => {
    wtf(2, 2).isEqual(4)
    wtf(3, 5).isEqual(8)
  })
  t.deepEqual(result, [ 
    { 
      argumentVariants: [ 
        { argumentLabels: [ '2', '2' ], argumentValues: [ 2, 2 ] }, 
        { argumentLabels: [ '2', '2' ], argumentValues: [ 2, 2 ] } 
      ], expectation: 4 
    },
    { 
      argumentVariants: [
        { argumentLabels: [ '3', '5' ], argumentValues: [ 3, 5 ] }, 
        { argumentLabels: [ '5', '3' ], argumentValues: [ 5, 3 ] } 
      ], expectation: 8 } 
  ]) 
  t.end()
})