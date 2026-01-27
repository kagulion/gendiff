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
