const lodash = require('lodash')
const wtf = require('./../src')

const print = ({ result, display }) => console.log(`${result} ≈ ${display}`)

wtf.sync({ lodash },
   ['apple', 'p'], true
).map(print)

wtf.sync({ lodash },
  [ 'c', [ 'a', 'b', 'c' ] ],
  3
).map(print)

wtf.sync({ lodash },
  ['apple', 'p'], true,
  ['apple', 'x'], false
).map(print)
