import iterate from '../src/lib/iterate'

test('iterate - works with empty lists', t => {
  t.plan(1)
  const generator = iterate([], [])
  t.deepEqual(generator.next(), { done: true, value: undefined })
})

const sum = (a, b) => a + b
const sub = (a, b) => a - b

const functions = [
  {
    func: sum,
    display: (a, b) => `${a} + ${b}`
  }, {
    func: sub,
    display: (a, b) => `${a} - ${b}`
  }
]

const query = [
  {
    variants: [
      {
        values: [ 1, 6 ],
        labels: [ "1", "6" ]
      }, {
        values: [ 6, 1 ],
        labels: [ "6", "1" ]
      }
    ],
    expectation: 5
  }
]

test('iterate - works for query with one element', t => {
  t.plan(6)
  const generator = iterate(functions, query)
  const returns = (value) => t.deepEqual(generator.next(), { done: false, value })
  const stops = () => t.ok(generator.next().done)
 
  returns({ type: 'step', step: [] })
  returns({ type: 'step', step: [] })
  returns({ type: 'step', step: [] })
  returns({ type: 'step', step: [] })
  returns({ type: 'match', display: '6 - 1', modified: false})
  stops()  
  // t.deepEqual(generator.next(), { done: false, value: {} })
  // t.deepEqual(generator.next()).to.eql({ done: false, value: { current:1, result: 2, display: '1 + 1', modified: false } })
  // t.deepEqual(generator.next()).to.eql({ done: false, value: { current:2, result: 7, display: '6 + 1', modified: false } })
  // t.deepEqual(generator.next()).to.eql({ done: false, value: { current:3, result: 0, display: '1 - 1', modified: false } })
  // t.deepEqual(generator.next()).to.eql({ done: false, value: { current:4, result: 5, display: '6 - 1', modified: false } })
  // t.deepEqual(generator.next()).to.eql({ done: true, value: undefined })
})
  // 
  // it('supports skip option', () => {
  //   const generator = iterate(funcList, argsList, { skip: 2 })
  //   expect(generator.next()).to.eql({ done: false, value: { current:3, result: 0, display: '1 - 1', modified: false } })
  //   expect(generator.next()).to.eql({ done: false, value: { current:4, result: 5, display: '6 - 1', modified: false } })
  //   expect(generator.next()).to.eql({ done: true, value: undefined })
  // })

