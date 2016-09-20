import test from 'tape'
import argumentVariants, { permutations } from '../src/lib/argumentVariants'


test('permutations uses values for numbers', t => {
  t.deepEqual(permutations(1), [ [ 1 ] ])
  t.deepEqual(permutations(2), [ [ 1, 2 ], [ 2, 1 ] ])
  const ten = permutations(10)

  t.equal(ten.length, 6)
  t.deepEqual(ten[ 0 ], [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ])
  t.deepEqual(ten[ ten.length - 1 ], [ 3, 2, 1, 4, 5, 6, 7, 8, 9, 10 ])
  t.deepEqual(permutations(4)[0], [ 1, 2, 3, 4])
  t.end()
})


test('argumentVariants works', t => {
  const a = () => ({})
  t.deepEqual(argumentVariants(1, a), [  
    { argumentLabels: [ '1', 'f' ], argumentValues: [ 1, a ] }, 
    { argumentLabels: [ 'f', '1' ], argumentValues: [ a, 1 ] } 
  ])
  t.deepEqual(argumentVariants(1), [ 
    { argumentLabels: [ '1' ], argumentValues: [ 1 ] } 
  ])
  t.deepEqual(argumentVariants(), [ 
    { argumentLabels: [ ], argumentValues: [ ] } 
  ])
  t.deepEqual(argumentVariants('x', 'y', 'z', 't'), [
    { argumentLabels: [ "'x'", "'y'", "'z'", "'t'" ], argumentValues: [ 'x', 'y', 'z', 't' ] }, 
    { argumentLabels: [ "'x'", "'z'", "'y'", "'t'" ], argumentValues: [ 'x', 'z', 'y', 't' ] }, 
    { argumentLabels: [ "'y'", "'x'", "'z'", "'t'" ], argumentValues: [ 'y', 'x', 'z', 't' ] }, 
    { argumentLabels: [ "'y'", "'z'", "'x'", "'t'" ], argumentValues: [ 'y', 'z', 'x', 't' ] }, 
    { argumentLabels: [ "'z'", "'x'", "'y'", "'t'" ], argumentValues: [ 'z', 'x', 'y', 't' ] }, 
    { argumentLabels: [ "'z'", "'y'", "'x'", "'t'" ], argumentValues: [ 'z', 'y', 'x', 't' ] }
   ])
  t.end()
})
