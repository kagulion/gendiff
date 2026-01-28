// Проверка на чистый объект
const isObject = (value) =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

// Основная функция
const diffObjects = (obj1, obj2) => {
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])]

  return keys.map((key) => {
    if (!(key in obj2)) {
      return {
        key,
        type: 'удалён',
        value: obj1[key],
      }
    }

    if (!(key in obj1)) {
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

    if (obj1[key] !== obj2[key]) {
      return {
        key,
        type: 'обновлён',
        oldValue: obj1[key],
        newValue: obj2[key],
      }
    }

    return {
      key,
      type: 'не изменён',
      value: obj1[key],
    }
  })
}

export default diffObjects
