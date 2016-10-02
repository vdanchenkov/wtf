import clone from 'clone'
import isEqual from 'is-equal'
import inspect from 'util-inspect'

export const formatConditions = (conditions) => {
  const result = []
  for (let i = 0; i < conditions.length; i = i + 2) {
    result.push({ args: conditions[ i ], result: conditions[ i + 1 ] })
  }
  return result
}

export const enumerateModules = (libs) => {
  const result = []
  for (let libraryName in libs) {
    const library = libs[libraryName]
    if (Array.isArray(library)) {
      library.forEach(l => result.push(l))
    } else {
      Object.getOwnPropertyNames(library).forEach(functionName => {
        const func = library[functionName]
        if (typeof func === 'function') {
          result.push({
            display: (...args) => `${libraryName}.${functionName}(${args.join(', ')})`,
            func
          })
        }
      })
      if (library === Object ||
        library === Array ||
        library === String ||
        library === Date ||
        library === RegExp) {

        instanceMethodsAndProperties(library).forEach(def => result.push(def))
      }
    }
  }
  return result
}

/**
* Counts steps required to iterate through all functions and variants
*/
export const countSteps = (functionDefinitions, conditions) => {
  return functionDefinitions.length * variantsNumber(conditions)
}

export const destructFunction = times => fn => {
  let i = 0
  return (...args) => {
    if (i >= times) {
      throw new Error()
    }
    i++
    return fn(...args)
  }
}

export const notFunction = maybeFn => typeof maybeFn !== 'function'

export const check = (functionDescriptors, conditions, step) => {
  const functionIndex =  step / variantsNumber(conditions) | 0
  const variantIndex = step % variantsNumber(conditions)
  const functionDescriptor = functionDescriptors[ functionIndex ]
  const matches = []
  for (let condition of conditions) {
    const values = variant(variantIndex, condition.args)
    const clonedValues = clone(values).map(maybeFn => {
      if (typeof maybeFn === 'function') {
        return destructFunction(9999)(maybeFn)
      }

      return maybeFn
    })

    let result
    try {
      result = functionDescriptor.func(...clonedValues)
    } catch (e) {
      return false
    }
    if (typeof condition.result === 'function') {
      try {
        const fnResult = condition.result(result)
        if (!fnResult) return false
      } catch (e) {
        return false
      }
    } else if (!isEqual(result, condition.result)) {
      return false
    }

    const display = functionDescriptor.display(...values.map(label))
    const modified = !isEqual(values.filter(notFunction), clonedValues.filter(notFunction))
    matches.push({ display, modified, result: label(condition.result) })
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

export const label = inspect

// TODO
// const arithmetics = [ '+', '-', '/', '*' ].map(operator => ({
//   display: (a, b) => [ a, operator, b ].join(' '),
//   func: new Function('a', 'b', `return a ${operator} b`)
// }))
//

const instanceMethodsAndProperties = (constructor) => {
  const prototype = constructor.prototype
  return Object.getOwnPropertyNames(prototype).map(key => {
    if (typeof prototype[key] == 'function') {
      return {
        func: (...args) => {
          if (args[0].constructor === constructor) {
            return prototype[key].call(...args)
          }
        },
        display: (obj, ...rest) => `${obj}.${key}(${rest.join(', ')})`
      }
    } else {
      return {
        func: (...args) => {
          if (args[0].constructor === constructor) {
            return args[0][key]
          }
        },
        display: (obj) => `${obj}.${key}`
      }
    }
  })
}

// deprecated
export const es = { Object, Array, String, Date, RegExp }

const print = (message) => {
  if (message.type == 'match') {
    console.log(`${message.result} \u{2248} ${message.display}${message.modified ? ' (changes arguments!)' : ''}`);
  }
}

export const sync = (modules, ...conditions) => {
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
    sync(modulesDefinition, ...rest).forEach(print)
  } else {
    throw new Error('not implemented')
  }
}

wtf.sync = sync
wtf.es = es
