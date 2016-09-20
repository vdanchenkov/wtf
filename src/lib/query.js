import argumentVariants from './argumentVariants'

/**
* Returns query
*/
export default (definition) => {
  const query = []
  const wtf = (...args) => (
    { isEqual: (expectation) => query.push({ argumentVariants: argumentVariants(...args), expectation }) }
  )
  definition(wtf)
  return query
}