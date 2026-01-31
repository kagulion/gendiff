import plain from './plain.js'
import json from './json.js'
import stylish from './stylish.js'

const formats = {
  stylish,
  plain,
  json,
}

export default (diffTree, format) => {
  const formatter = formats[format]
  if (!formatter) {
    throw new Error(`Неизвестный формат: ${format}`)
  }

  return formatter(diffTree)
}
