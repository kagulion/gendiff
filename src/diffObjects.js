import isObject from './isObject.js'

// Получение ключей
const getKeys = (obj1, obj2) =>
  [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort()

// Основная функция
const diffObjects = (obj1, obj2) => {
  const keys = getKeys(obj1, obj2)

  return keys.map((key) => {
    const hasKey1 = key in obj1
    const hasKey2 = key in obj2

    if (!hasKey2) {
      return {
        key,
        type: 'удалён',
        value: obj1[key],
      }
    }

    if (!hasKey1) {
      return {
        key,
        type: 'добавлен',
        value: obj2[key],
      }
    }

    const value1 = obj1[key]
    const value2 = obj2[key]

    if (isObject(value1) && isObject(value2)) {
      return {
        key,
        type: 'вложенный',
        children: diffObjects(value1, value2),
      }
    }

    if (value1 !== value2) {
      return {
        key,
        type: 'обновлён',
        oldValue: value1,
        newValue: value2,
      }
    }

    return {
      key,
      type: 'не изменён',
      value: value1,
    }
  })
}

export default diffObjects
