import { syncSearch } from './../src'
import lodash from 'lodash'

const print = ({ result, display }) => console.log(`${result} ≈ ${display}`)

syncSearch({ lodash }, true, [
  'apple', 'p'
]).map(print)

syncSearch({ lodash }, 3, [ 'c', [ 'a', 'b', 'c' ] ]).map(print)

syncSearch({ lodash },
  true, ['apple', 'p'],
  false, ['apple', 'x']
).map(print)
