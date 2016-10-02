const ramda = require('ramda')
const wtf = require('../src')

wtf({ ramda },
  [ramda.toUpper, e => `${e}!`], fn => {
    return typeof fn === 'function' && fn('hey') === 'HEY!';
  },
) // will print `ramda.compose`
