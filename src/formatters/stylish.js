const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value)
  }

  const indent = ' '.repeat(depth * 4)
  const closingIndent = ' '.repeat((depth - 1) * 4)

  const lines = Object.entries(value).map(
    ([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`,
  )

  return ['{', ...lines, `${closingIndent}}`].join('\n')
}

const stylish = (diffTree) => {
  const iter = (nodes, depth) => {
    const indent = ' '.repeat(depth * 4 - 2)
    const closingIndent = ' '.repeat((depth - 1) * 4)

    const lines = nodes.map((node) => {
      const { key, type } = node

      switch (type) {
        case 'добавлен':
          return `${indent}+ ${key}: ${stringify(node.value, depth + 1)}`
        case 'удалён':
          return `${indent}- ${key}: ${stringify(node.value, depth + 1)}`
        case 'не изменён':
          return `${indent}  ${key}: ${stringify(node.value, depth + 1)}`
        case 'обновлён':
          return [
            `${indent}- ${key}: ${stringify(node.oldValue, depth + 1)}`,
            `${indent}+ ${key}: ${stringify(node.newValue, depth + 1)}`,
          ].join('\n')
        case 'вложенный':
          return `${indent}  ${key}: ${iter(node.children, depth + 1)}`
        default:
          throw new Error(`Неизвестный тип: ${type}`)
      }
    })

    return ['{', ...lines, `${closingIndent}}`].join('\n')
  }

  return iter(diffTree, 1)
}

export default stylish
