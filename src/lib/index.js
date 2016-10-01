import clone from 'clone'
import isEqual from 'is-equal'
import inspect from 'util-inspect'

export const formatConditions = (conditions) => {
  const result = []
  for (let i = 0; i < conditions.length; i = i + 2) {
    result.push({ result: conditions[ i ], args: conditions[ i + 1 ] })
  }
  return result
}

export const enumerateModules = (libs) => {
  const result = []
  for (let libraryName in libs) {
    const library = libs[libraryName]
    Object.getOwnPropertyNames(library).forEach(functionName => {
      const func = library[functionName]
      if (typeof func === 'function') {
        result.push({
          display: (...args) => `${libraryName}.${functionName}(${args.join(', ')})`,
          func
        })
      }
    })
  }
  return result
}

/**
* Counts steps required to iterate through all functions and variants
*/
export const countSteps = (functionDefinitions, conditions) => {
  return functionDefinitions.length * variantsNumber(conditions)
}

export const check = (functionDescriptors, conditions, step) => {
  const functionIndex =  step / variantsNumber(conditions) | 0
  const variantIndex = step % variantsNumber(conditions)
  const functionDescriptor = functionDescriptors[ functionIndex ]
  const matches = []
  for (let condition of conditions) {
    const values = variant(variantIndex, condition.args)
    const clonedValues = clone(values)
    let result
    try {
      result = functionDescriptor.func(...clonedValues)
    } catch (e) {
      return false
    }
    if (!isEqual(result, condition.result)) {
      return false
    }

    const display = functionDescriptor.display(labels(values))
    const modified = !isEqual(values, clonedValues)
    matches.push({ display, modified, result: labels(condition.result) })
  }
  return matches
}

const permutations = [ [ 0, 1, 2 ], [ 1, 0, 2 ], [ 0, 2, 1 ], [ 1, 2, 0 ], [ 2, 0, 1 ], [ 2, 1, 0 ] ]

const variantsNumber = (conditions) => {
  let argumentCount = conditions[0] ? conditions[0].args.length : 0
  for (let c of conditions) {
    argumentCount = Math.min(argumentCount, c.args.length)
  }
  return [1, 1, 2, 6][argumentCount] || 6
}

// might have more in a future
export const variant = (id, args) => {
  return [ ...permutations[id].map(i => args[i]), ...args.slice(3) ].slice(0, args.length)
}

const isArray = (o) => Array.isArray(o)
const isPlainObject = (o) => typeof o != null && typeof o === 'object' && !Array.isArray(o)
const isFunction = (o) => typeof o === 'function'

export const labels = (args) => {
  return Array.isArray(args) ? args.map(inspect) : inspect(args)
}

const print = (message) => {
  if (message.type == 'match') {
    console.log(`${message.result} \u{2248} ${message.display}${message.modified ? ' (changes arguments!)' : ''}`);
  }
}

export const syncSearch = (modules, ...conditions) => {
  // group conditions
  const functionDefinitions = enumerateModules(modules)
  conditions = formatConditions(conditions)
  const result = []
  const steps = countSteps(functionDefinitions, conditions)
  for (let i = 0; i < steps; i++) {
    const matches = check(functionDefinitions, conditions, i)
    if (matches) {
      matches.forEach(match => result.push({ type: 'match', ... match }))
    }
  }
  return result
}

/**
* Something easy to use
*/
export const wtf = (modulesDefinition, ...rest) => {
  if (isPlainObject(modulesDefinition)) {
    syncSearch(modulesDefinition, ...rest).forEach(print)
  } else {
    throw new Error('not implemented')
  }
}

wtf.syncSearch = syncSearch
