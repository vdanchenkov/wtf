import labels from './labels'

export const permutations = (count) => {
  return [
    [ [] ],
    [ [1] ],
    [ [1, 2], [2, 1] ],
    [ [1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1] ]
  ][ Math.min(3, count) ].map(firstArgs => {
    const args = firstArgs.slice()
    for (let i = 4; i < count + 1; i++) {
      args.push(i)
    }
    return args
  })
}

export default (...args) => {
  return permutations(args.length).map(argsOrder => {
    const values = argsOrder.map(i => args[i - 1])
    return { argumentValues: values, argumentLabels: labels(...values) }
  })
}
