import iterate from '../src/lib/iterate'

const generates = (t, generator, ...results) => {
  for (let result of results) {
    const value = generator.next().value
    t.deepEqual(value, result) 
  } 
  t.ok(generator.next().done)
}

test('iterate - works for 1 function, 2 criterias', t => {
  const functionDescriptors = [
    {
      display: (a, b) => `${a} + ${b}`,
      func: (a, b) => a + b
    }
  ]
  
  const query = [
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
      ], expectation: 8 
    } 
  ]
  
  const g = iterate(functionDescriptors, query)
  
  generates(t, g, 
    { type: 'step', step: [ 0, 0, 0 ] },
    { type: 'step', step: [ 0, 0, 1 ] },
    { type: 'step', step: [ 0, 1, 0 ] },
    { type: 'step', step: [ 0, 1, 1 ] },
    { type: 'match', matches: [ 
      [ 
        { display: '2 + 2', modified: false }, 
        { display: '2 + 2', modified: false } 
      ], [ 
        { display: '3 + 5', modified: false }, 
        { display: '5 + 3', modified: false } 
      ] 
    ] }
  )
  t.end()
})