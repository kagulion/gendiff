import loadData from './loadData.js'
import diffObjects from './diffObjects.js'

const genDiff = (filepath1, filepath2) => {
  const obj1 = loadData(filepath1)
  const obj2 = loadData(filepath2)

  return diffObjects(obj1, obj2)
}

export default genDiff
