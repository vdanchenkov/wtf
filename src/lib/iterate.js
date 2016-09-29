
export default function * (functionDescriptors, query) {
  for (let i = 0; i < functionDescriptors.length; i++) {
    const functionDescriptor = functionDescriptors[i]
    yield* iterateArguments(functionDescriptor, i, query)
  }
}

function matchFunction(functionDescriptor, variant, expectation) {
  try {
    const clonedValues = clone(variant.values)
    const result = functionDescriptor.func(...clonedValues)
    if (isEqual(result, expectation)) {
      const display = functionDescriptor.display(...variant.labels)
      const modified = !isEqual(variant.values, clonedValues)
      return { display, modified, expectation: String(expectation) }
    }
  } catch (e) {
    // ignore
  }
  return false
}

function * iterateArguments(functionDescriptor, functionIndex, query) {
  if (query.length === 0) {
    return
  }
  const matches = Array(query.length).fill(0).map(() => ([]))

  for (let criteriaIndex = 0; criteriaIndex < query.length; criteriaIndex++) {
    const criteria = query[ criteriaIndex ]
    const criteriaMatches = matches[ criteriaIndex ]
    for (let variantIndex = 0; variantIndex < criteria.variants.length; variantIndex++) {
      const variant = criteria.variants[ variantIndex ]
      yield { type: 'step', step: [ functionIndex, criteriaIndex, variantIndex ] }
      const match = matchFunction(functionDescriptor, variant, criteria.expectation)
      if (match) {
        criteriaMatches.push(match)
      }
    }
    if (criteriaMatches.length == 0) {
      return;
    }
  }
  yield { type: 'match', matches }
}
