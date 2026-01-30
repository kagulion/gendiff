import plain from './plain.js'
import json from './json.js'
import stylish from './stylish.js'

// Общий диспетчер форматтеров
export default (diffTree, format) => {
  switch (format) {
    case 'plain':
      return plain(diffTree)

    case 'json':
      return json(diffTree)

    case 'stylish':
      return stylish(diffTree)

    default:
      throw new Error(`Неизвестный формат: ${format}`)
  }
}
