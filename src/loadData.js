import readFile from './readFile.js'
import parse from './parsers.js'
import getFormat from './getFormat.js'

// Файл → объект
const loadData = (filepath) => {
  const data = readFile(filepath)
  const format = getFormat(filepath)

  return parse(data, format)
}

export default loadData