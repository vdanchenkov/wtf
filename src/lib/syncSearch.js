import { enumerateModules, countSteps, formatConditions, check } from './index'

export default (modules, ...conditions) => {
  // group conditions
  const functionDefinitions = enumerateModules(modules)
  conditions = formatConditions(conditions)
  const result = []
  const steps = countSteps(functionDefinitions, conditions)
  for (let i = 0; i < steps; i++) {
    const matches = check(functionDefinitions, conditions, i)
    if (matches) {
      matches.forEach(match => result.push(match))
    }
  }
  return result
}
