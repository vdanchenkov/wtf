import test from "tape"

import query from '../src/lib/query'

test('query - works with 1 wtf', (t) => {
  t.plan(1)
  const result = query(wtf => wtf(1).isEqual(1))
  t.deepEqual(result, [ 
    { variants: [ 
      { labels: [ '1' ], values: [ 1 ] } 
    ], expectation: 1 } 
  ]) 
})

test('query - works with 2 wtfs', (t) => {
  t.plan(1)
  const result = query(wtf => {
    wtf(2, 2).isEqual(4)
    wtf(3, 5).isEqual(8)
  })
  t.deepEqual(result, [ 
    { 
      variants: [ 
        { labels: [ '2', '2' ], values: [ 2, 2 ] }, 
        { labels: [ '2', '2' ], values: [ 2, 2 ] } 
      ], expectation: 4 
    },
    { 
      variants: [
        { labels: [ '3', '5' ], values: [ 3, 5 ] }, 
        { labels: [ '5', '3' ], values: [ 5, 3 ] } 
      ], expectation: 8 } 
  ]) 
})