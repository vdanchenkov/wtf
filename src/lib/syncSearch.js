import enumerateModules from './enumerateModules'
import buildQuery from './query'
import iterate from './iterate'

const doSearch = (modules) => {
  const functionDefinitions = enumerateModules(modules)
  return (query) => {
    const queryDefinition = buildQuery(query)
    const result = []
    for (var m of iterate(functionDefinitions, queryDefinition)) {
      if (m.type === 'match') {
        m.matches.forEach(matchesByCriteria => matchesByCriteria.forEach(match => result.push(match)))
      }
    }
    return result
  } 
}

export default (modules, query) => {
  return query ? doSearch(modules)(query) : doSearch(modules)
}
