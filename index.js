import genDiff from './src/genDiff.js'
import formatDispatch from './src/formatters/index.js'

// Основная функция, которая возвращает отформатированные различия (для CLI и программного использования)
const renderDiff = (filepath1, filepath2, format = 'stylish') => {
  const diffTree = genDiff(filepath1, filepath2)
  return formatDispatch(diffTree, format)
}

export { renderDiff as default, genDiff }
