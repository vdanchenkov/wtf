import clone from 'clone'
import isEqual from 'is-equal'

export default function *(functions, query, options = {}) {
  let current = 0
  // TODO skip
  const skipStep = options.skipStep

  for (const f of functions) {
    // TODO walk through queries
    const { variants, expectation} = query[0]
    for (const variant of variants) {
      // current++
      // if (options.skip && current <= options.skip) continue
      yield { type: 'step', step: [] }
      try {
        const clonedValues = clone(variant.values)
        const result = f.func(...clonedValues)
        if (isEqual(result, expectation)) {
          const display = f.display(...variant.labels)
          const modified = !isEqual(variant.values, clonedValues)
          yield { type: 'match', display, modified }
        }        
      } catch (e) {
        // ignored
      }
    }
  }
}
