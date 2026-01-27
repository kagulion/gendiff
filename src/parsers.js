import yaml from 'js-yaml'

// Парсинг строки в JS-объект
const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data)
    case 'yml':
    case 'yaml':
      return yaml.load(data)
    default:
      throw new Error(`Неизвестный формат: ${format}`)
  }
}

export default parse