<big><h1 align="center">wtf</h1></big>

<p align="center">
  <a href="https://npmjs.org/package/wtf">
    <img src="https://img.shields.io/npm/v/wtf.svg?style=flat-square"
         alt="NPM Version">
  </a>

  <a href="https://coveralls.io/r/vdanchenkov/wtf">
    <img src="https://img.shields.io/coveralls/vdanchenkov/wtf.svg?style=flat-square"
         alt="Coverage Status">
  </a>

  <a href="https://travis-ci.org/vdanchenkov/wtf">
    <img src="https://img.shields.io/travis/vdanchenkov/wtf.svg?style=flat-square"
         alt="Build Status">
  </a>

  <a href="https://npmjs.org/package/wtf">
    <img src="http://img.shields.io/npm/dm/wtf.svg?style=flat-square"
         alt="Downloads">
  </a>

  <a href="https://david-dm.org/vdanchenkov/wtf.svg">
    <img src="https://david-dm.org/vdanchenkov/wtf.svg?style=flat-square"
         alt="Dependency Status">
  </a>

  <a href="https://github.com/vdanchenkov/wtf/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/wtf.svg?style=flat-square"
         alt="License">
  </a>
</p>

<p align="center"><big>
Find out what the function you need
</big></p>


## Install

```sh
npm install wtf
```


## Usage

### Sync search
Synchronous search is simple, fast and the only one supporting preloaded modules. Downside is that if it hangs - your thread will too.

```js
import { syncSearch } from 'wtf'
import lodash from 'lodash'

const print = ({ result, display }) => console.log(`${result} ≈ ${display}`)

syncSearch({ lodash },
  true, ['apple', 'p'],
  false, ['apple', 'x']
).map(print)
```

### Web worker
<span style="color: red; font-weight: bold">Not implemented yet</span>

```js
import { webWorkerSearch } from 'wtf'

const print = ({ result, display }) => display && console.log(`${result} ≈ ${display}`)

const search = webWorkerSearch('lodash',
  true, ['apple', 'p'],
  false, ['apple', 'x']
).map(print)
```

## License

MIT © [Vladimir Danchenkov](http://github.com/vdanchenkov)

[npm-url]: https://npmjs.org/package/wtf
[npm-image]: https://img.shields.io/npm/v/wtf.svg?style=flat-square

[travis-url]: https://travis-ci.org/vdanchenkov/wtf
[travis-image]: https://img.shields.io/travis/vdanchenkov/wtf.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/vdanchenkov/wtf
[coveralls-image]: https://img.shields.io/coveralls/vdanchenkov/wtf.svg?style=flat-square

[depstat-url]: https://david-dm.org/vdanchenkov/wtf
[depstat-image]: https://david-dm.org/vdanchenkov/wtf.svg?style=flat-square

[download-badge]: http://img.shields.io/npm/dm/wtf.svg?style=flat-square
