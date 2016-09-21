import variants from './variants'

/**
* Returns query
*/
export default (definition) => {
  const query = []
  const wtf = (...args) => (
    { isEqual: (expectation) => query.push({ variants: variants(...args), expectation }) }
  )
  definition(wtf)
  return query
}