import diffObjects from '../src/diffObjects.js'

test('разница пустых объектов', () => {
  const result = diffObjects({}, {})
  expect(result).toEqual([])
})

test('добавленные и удаленные ключи', () => {
  const obj1 = { a: 1 }
  const obj2 = { b: 2 }

  expect(diffObjects(obj1, obj2)).toEqual([
    { key: 'a', type: 'удалён', value: 1 },
    { key: 'b', type: 'добавлен', value: 2 },
  ])
})

test('обновленные ключи', () => {
  const obj1 = { a: 1 }
  const obj2 = { a: 2 }

  expect(diffObjects(obj1, obj2)).toEqual([
    { key: 'a', type: 'обновлён', oldValue: 1, newValue: 2 },
  ])
})

test('ключи без изменений', () => {
  const obj1 = { a: 1 }
  const obj2 = { a: 1 }

  expect(diffObjects(obj1, obj2)).toEqual([
    { key: 'a', type: 'не изменён', value: 1 },
  ])
})

test('смешанные случаи', () => {
  const obj1 = { a: 1, b: 2 }
  const obj2 = { b: 3, c: 4 }

  expect(diffObjects(obj1, obj2)).toEqual([
    { key: 'a', type: 'удалён', value: 1 },
    { key: 'b', type: 'обновлён', oldValue: 2, newValue: 3 },
    { key: 'c', type: 'добавлен', value: 4 },
  ])
})