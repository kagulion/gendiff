const formatValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

const plain = (tree, parentPath = '') => {
  const lines = tree.flatMap((node) => {
    const propertyPath = parentPath ? `${parentPath}.${node.key}` : node.key

    switch (node.type) {
      case 'добавлен':
        return `Свойство '${propertyPath}' было добавлено со значением: ${formatValue(node.value)}`

      case 'удалён':
        return `Свойство '${propertyPath}' было удалено`

      case 'не изменён':
        return null

      case 'обновлён':
        return `Свойство '${propertyPath}' было обновлено. С ${formatValue(node.oldValue)} на ${formatValue(node.newValue)}`

      case 'вложенный':
        return plain(node.children, propertyPath)

      default:
        throw new Error(`Неизвестный тип: ${node.type}`)
    }
  })

  return lines.filter(Boolean).join('\n')
}

export default plain
