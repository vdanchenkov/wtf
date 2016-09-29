import { syncSearch } from './../src'
import lodash from 'lodash'

syncSearch({ lodash }, 3, [ 'c', [ 'a', 'b', 'c' ] ]).map(m => console.log(`${m.result} ≈ ${m.display}`))

syncSearch({ lodash },
  true, ['apple', 'p'],
  false, ['apple', 'x']
).map(m => console.log(`${m.result} ≈ ${m.display}`))
